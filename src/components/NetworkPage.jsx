// components/NetworkPage.jsx
// Shared component used by both SkillsPage and CertificationsPage.
// Pass in your data, categories, labels, and render props — this handles
// all D3 logic, filter state, and layout.

import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import * as d3 from 'd3';

const D3_COLORS = {
  border:      '#334155',
  purple:      '#8b5cf6',
  blue:        '#60a5fa',
  textPrimary: '#ffffff',
};

export default function NetworkPage({
  // Helmet
  helmetTitle,
  helmetDescription,
  helmetCanonical,
  // Layout
  containerClass,
  sectionClass,
  gridClass,
  // Hero
  heroTitle,
  introduction,
  // Data
  data,           // array of { id, name, category, connections, ...rest }
  categories,     // array of { name, color }
  // Labels
  categorySectionTitle,
  networkTitle,
  networkDescription,
  getCountLabel,    // (count: number) => string  e.g. count => `${count} skills`
  getDisplayedTitle, // (selectedItem, selectedCategory) => string
  // Render props
  renderCard,           // (item, isActive, onSelect) => JSX
  renderSelectedLegend, // (selectedItem) => JSX
}) {
  const [selectedItem, setSelectedItem]         = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const svgRef = useRef();

  const categoryGroups = {};
  data.forEach(item => {
    if (!categoryGroups[item.category]) categoryGroups[item.category] = [];
    categoryGroups[item.category].push(item);
  });

  const displayedItems = selectedItem
    ? [selectedItem]
    : selectedCategory
    ? (categoryGroups[selectedCategory] || [])
    : data;

  // ── D3 setup (runs once) ──────────────────────────────────────────────────
  useEffect(() => {
    if (!svgRef.current) return;
    const width  = svgRef.current.clientWidth;
    const height = 600;

    const nodes = [
      { id: 'Hubert', label: 'Hubert', type: 'center', category: 'center' },
      ...data.map(item => ({
        id: item.id, label: item.name, type: 'item', category: item.category,
      })),
    ];

    const links = [];
    data.forEach(item => {
      links.push({ source: 'Hubert', target: item.id });
      item.connections.forEach(conn => {
        if (data.find(d => d.id === conn))
          links.push({ source: item.id, target: conn });
      });
    });

    const uniqueLinks = [];
    const linkSet = new Set();
    links.forEach(link => {
      const key = [link.source, link.target].sort().join('-');
      if (!linkSet.has(key)) { uniqueLinks.push(link); linkSet.add(key); }
    });

    const simulation = d3
      .forceSimulation(nodes)
      .force('link',      d3.forceLink(uniqueLinks).id(d => d.id).distance(80))
      .force('charge',    d3.forceManyBody().strength(-300))
      .force('center',    d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    const svg = d3.select(svgRef.current);
    svg.attr("class", "network-svg");
    svg.selectAll('*').remove();

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('role', 'img')
      .attr('aria-label', `Network diagram showing how ${heroTitle.toLowerCase()} connect and relate`)
      .append('g');

    const link = g
      .selectAll('line')
      .data(uniqueLinks)
      .enter()
      .append('line')
      .attr('stroke', D3_COLORS.border)
      .attr('stroke-width', 2)
      .attr('opacity', 0.4);

    const node = g
      .selectAll('g.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .call(
        d3.drag()
          .on('start', (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
          .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y; })
          .on('end',   (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; })
      );

    node
      .append('circle')
      .attr('r', d => (d.type === 'center' ? 40 : 25))
      .attr('fill', d => {
        if (d.type === 'center') return D3_COLORS.purple;
        const cat = categories.find(c => c.name === d.category);
        return cat ? cat.color : D3_COLORS.blue;
      })
      .attr('opacity', 0.9)
      .attr('stroke', D3_COLORS.textPrimary)
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('click', (e, d) => {
        if (d.type !== 'center') {
          const item = data.find(i => i.id === d.id);
          setSelectedItem(item);
          setSelectedCategory(null);
        }
      })
      .on('mouseover', (e, d) => {
        link.attr('stroke', l =>
          (l.source.id === d.id || l.target.id === d.id) ? D3_COLORS.purple : D3_COLORS.border
        );
      })
      .on('mouseout', () => link.attr('stroke', D3_COLORS.border));

    node
      .append('text')
      .text(d => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .attr('fill', D3_COLORS.textPrimary)
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('pointer-events', 'none');

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs once — data and categories are stable module references

  // ── D3 filter (runs when selection changes) ───────────────────────────────
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    if (!selectedCategory && !selectedItem) {
      svg.selectAll('g.node').transition().duration(300).attr('opacity', 1);
      svg.selectAll('line').transition().duration(300).attr('opacity', 0.4);
      return;
    }

    let relevantIds;
    if (selectedItem) {
      relevantIds = new Set(['Hubert', selectedItem.id, ...selectedItem.connections]);
    } else {
      const catItems = data.filter(i => i.category === selectedCategory);
      relevantIds = new Set(['Hubert', ...catItems.map(i => i.id)]);
      catItems.forEach(i => i.connections.forEach(c => relevantIds.add(c)));
    }

    svg.selectAll('g.node')
      .transition().duration(300)
      .attr('opacity', d => relevantIds.has(d.id) ? 1 : 0.08);

    svg.selectAll('line')
      .transition().duration(300)
      .attr('opacity', l => {
        const src = l.source?.id ?? l.source;
        const tgt = l.target?.id ?? l.target;
        return (relevantIds.has(src) && relevantIds.has(tgt)) ? 0.6 : 0.03;
      });
  }, [selectedCategory, selectedItem, data]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
    setSelectedItem(null);
  };

  const handleClearFilters = () => {
    setSelectedItem(null);
    setSelectedCategory(null);
  };

  return (
    <div className={containerClass}>
      <Helmet>
        <title>{helmetTitle}</title>
        <meta name="description" content={helmetDescription} />
        <link rel="canonical" href={helmetCanonical} />
      </Helmet>

      {/* Hero */}
      <section className="hero-section">
        <h1 className="hero-title">{heroTitle}</h1>
        <p className="introduction">{introduction}</p>
      </section>

      {/* Category filter */}
      <section className="category-section">
        <h2 className="section-title">{categorySectionTitle}</h2>
        <div className="category-grid">
          {categories.map(cat => {
            const count    = data.filter(i => i.category === cat.name).length;
            const isActive = selectedCategory === cat.name;
            return (
              <div
                key={cat.name}
                className={`category-card ${isActive ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategoryClick(cat.name);
                  }
                }}
              >
                <div className="category-dot" style={{ backgroundColor: cat.color }} />
                <h3 className="category-name">{cat.name}</h3>
                <p className="skill-count">{getCountLabel(count)}</p>
              </div>
            );
          })}
        </div>

        {(selectedItem || selectedCategory) && (
          <div className="filter-info">
            <p className="filter-text">
              {selectedItem
                ? `Showing: ${selectedItem.name}`
                : `Showing ${displayedItems.length} ${getCountLabel(displayedItems.length)} from ${selectedCategory}`}
            </p>
            <button onClick={handleClearFilters} className="clear-button">
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Network graph */}
      <section className="network-section">
        <h2 className="section-title">{networkTitle}</h2>
        <p className="network-description">{networkDescription}</p>
        <div className="network-container">
          <svg ref={svgRef} />
        </div>
        <div className="network-legend">
          <p className="legend-title">Click on any node to explore its connections. Drag to reposition.</p>
          {selectedItem && renderSelectedLegend(selectedItem)}
        </div>
      </section>

      {/* Item cards */}
      <section className={sectionClass}>
        <h2 className="section-title">
          {getDisplayedTitle(selectedItem, selectedCategory)}
        </h2>
        <div className={gridClass}>
          {displayedItems.map(item =>
            renderCard(item, selectedItem?.id === item.id, () => {
              setSelectedItem(item);
              setSelectedCategory(null);
            })
          )}
        </div>
      </section>
    </div>
  );
}