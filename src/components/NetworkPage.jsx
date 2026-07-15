// components/NetworkPage.jsx
// Shared component used by both SkillsPage and CertificationsPage.
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
  const zoomRef = useRef(null); // holds the d3-zoom behavior so the +/-/reset buttons can drive it

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

    // Apply the class (which sets width:100%) BEFORE measuring clientWidth —
    // otherwise we measure the element while it's still unstyled/un-sized.
    const svg = d3.select(svgRef.current);
    svg.attr("class", "network-svg");
    svg.selectAll('*').remove();

    const containerWidth = svgRef.current.clientWidth;

    // The simulation's canvas is the "room" nodes are allowed to spread out
    // in. It must NOT just be the screen's pixel size — on a phone that's
    // only ~390px wide, so a couple dozen nodes would be forced to overlap
    // no matter how far you zoom out (zooming only changes how big that
    // cramped room *looks*, not how much room there actually is).
    // Instead we size the canvas from the node count itself, so there's
    // always enough physical space for the nodes to settle without
    // colliding, and let pan/zoom be how you navigate that space.
    const nodeCount = data.length + 1; // +1 for the center "Hubert" node
    const areaPerNode = 9000; // px² per node — tuned for radius ~25-40 circles plus label breathing room
    const canvasSide = Math.sqrt(nodeCount * areaPerNode);
    const width  = Math.max(containerWidth, canvasSide);
    const height = Math.max(600, canvasSide);

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

    const nodeRadius = d => (d.type === 'center' ? 40 : 25);


    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('role', 'img')
      .attr('aria-label', `Network diagram showing how ${heroTitle.toLowerCase()} connect and relate`)
      .style('touch-action', 'none') // let d3-zoom own touch gestures instead of the page scroller
      // Unlike <img>, an <svg>'s height attribute doesn't auto-scale to keep
      // the aspect ratio once CSS width is overridden to 100% — it's just
      // read as a literal fixed CSS pixel height. Setting aspect-ratio
      // explicitly is what makes the canvas actually render as intended
      // (e.g. square) instead of stretched/squashed to fit the container.
      .style('aspect-ratio', `${width} / ${height}`)
      .style('height', 'auto');

    // The zoomable layer — panning/zooming just transforms this <g>, the
    // node/link drawing code below doesn't need to know zoom exists at all.
    const g = svg.append('g');

    // Pinch-to-zoom on touch, scroll/trackpad-zoom on desktop, drag-to-pan
    // on empty canvas. Node dragging (below) still works normally — d3-drag
    // stops the event from also reaching d3-zoom, so the two don't fight.
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 6])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);
    zoomRef.current = zoom;

    // iOS Safari fires its own proprietary gesture* events for two-finger
    // pinches and can hijack them into zooming the whole page even when
    // touch-action:none is set on the target. Blocking the native gesture
    // here forces the pinch through as regular multi-touch events instead,
    // which is what d3-zoom listens for.
    const svgNode = svgRef.current;
    const preventNativeGesture = (event) => event.preventDefault();
    svgNode.addEventListener('gesturestart', preventNativeGesture);
    svgNode.addEventListener('gesturechange', preventNativeGesture);
    svgNode.addEventListener('gestureend', preventNativeGesture);

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
      .attr('r', nodeRadius)
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
      // Keep every node inside the canvas — bounce off the walls instead
      // of letting the simulation push it out of view.
      nodes.forEach(d => {
        const r = nodeRadius(d);

        if (d.x < r) {
          d.x = r;
          d.vx = Math.abs(d.vx) * 0.5;
        } else if (d.x > width - r) {
          d.x = width - r;
          d.vx = -Math.abs(d.vx) * 0.5;
        }

        if (d.y < r) {
          d.y = r;
          d.vy = Math.abs(d.vy) * 0.5;
        } else if (d.y > height - r) {
          d.y = height - r;
          d.vy = -Math.abs(d.vy) * 0.5;
        }
      });

      link
        .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
      svgNode.removeEventListener('gesturestart', preventNativeGesture);
      svgNode.removeEventListener('gesturechange', preventNativeGesture);
      svgNode.removeEventListener('gestureend', preventNativeGesture);
    };
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

  const handleZoomIn = () => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(200).call(zoomRef.current.scaleBy, 1.4);
  };

  const handleZoomOut = () => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(200).call(zoomRef.current.scaleBy, 1 / 1.4);
  };

  const handleResetZoom = () => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.transform, d3.zoomIdentity);
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
          <div className="network-zoom-controls">
            <button
              type="button"
              className="zoom-btn"
              onClick={handleZoomIn}
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              type="button"
              className="zoom-btn"
              onClick={handleZoomOut}
              aria-label="Zoom out"
            >
              −
            </button>
            <button
              type="button"
              className="zoom-btn"
              onClick={handleResetZoom}
              aria-label="Reset zoom"
            >
              ⟲
            </button>
          </div>
        </div>
        <div className="network-legend">
          <p className="legend-title">
            Pinch or scroll to zoom, drag the background to pan, drag a node to reposition. Click a node to explore its connections.
          </p>
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