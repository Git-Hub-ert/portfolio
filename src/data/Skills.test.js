import { describe, it, expect } from 'vitest';
import skillsData from './Skills';

const ids = skillsData.map((skill) => skill.id);
const byId = new Map(skillsData.map((skill) => [skill.id, skill]));

describe('skillsData', () => {
  it('has unique ids', () => {
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('only connects to existing skills', () => {
    const broken = skillsData.flatMap((skill) =>
      skill.connections
        .filter((conn) => !byId.has(conn))
        .map((conn) => `${skill.id} -> ${conn}`),
    );
    expect(broken).toEqual([]);
  });

  it('has symmetric connections', () => {
    const oneWay = skillsData.flatMap((skill) =>
      skill.connections
        .filter((conn) => byId.has(conn) && !byId.get(conn).connections.includes(skill.id))
        .map((conn) => `${skill.id} -> ${conn}`),
    );
    expect(oneWay).toEqual([]);
  });

  it('never connects a skill to itself', () => {
    const selfLinks = skillsData.filter((skill) => skill.connections.includes(skill.id));
    expect(selfLinks.map((skill) => skill.id)).toEqual([]);
  });
});
