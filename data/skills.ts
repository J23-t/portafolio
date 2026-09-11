export interface Skill {
  name: string;
  icon: string;
  svg?: boolean;
  level: number;
  label: 'Intermedio' | 'Básico';
}

export interface SkillGroup {
  id: string;
  label: string;
  icon: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'lenguajes',
    label: 'Lenguajes',
    icon: 'code-slash-outline',
    skills: [
      { name: 'HTML5', icon: 'logo-html5', level: 75, label: 'Intermedio' },
      { name: 'CSS3', icon: 'logo-css3', level: 74, label: 'Intermedio' },
      { name: 'JavaScript', icon: 'logo-javascript', level: 72, label: 'Intermedio' },
      { name: 'TypeScript', icon: 'code-slash-outline', level: 65, label: 'Intermedio' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frameworks Frontend',
    icon: 'layers-outline',
    skills: [
      { name: 'React', icon: 'logo-react', level: 72, label: 'Intermedio' },
      { name: 'Vue', icon: 'logo-vue', level: 60, label: 'Intermedio' },
      { name: 'Angular', icon: 'logo-angular', level: 58, label: 'Intermedio' },
      { name: 'Next.js', icon: 'layers-outline', level: 68, label: 'Intermedio' },
    ],
  },
  {
    id: 'estilos',
    label: 'Estilos & UI',
    icon: 'color-palette-outline',
    skills: [
      { name: 'Tailwind CSS', icon: 'terminal-outline', level: 70, label: 'Intermedio' },
      { name: 'Bootstrap', icon: 'logo-bootstrap', svg: true, level: 68, label: 'Intermedio' },
      { name: 'Styled Components', icon: 'color-palette-outline', level: 56, label: 'Intermedio' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: 'server-outline',
    skills: [
      { name: 'Node.js', icon: 'logo-nodejs', level: 68, label: 'Intermedio' },
      { name: 'Express', icon: 'code-outline', level: 62, label: 'Intermedio' },
      { name: 'NestJS', icon: 'pulse-outline', level: 60, label: 'Intermedio' },
      { name: 'Python', icon: 'logo-python', level: 62, label: 'Intermedio' },
      { name: 'Django', icon: 'flower-outline', level: 52, label: 'Intermedio' },
      { name: 'FastAPI', icon: 'flash-outline', level: 50, label: 'Intermedio' },
      { name: 'Java', icon: 'cafe-outline', level: 45, label: 'Intermedio' },
      { name: 'Kotlin', icon: 'shield-outline', level: 40, label: 'Intermedio' },
    ],
  },
  {
    id: 'datos',
    label: 'Bases de Datos',
    icon: 'albums-outline',
    skills: [
      { name: 'MongoDB', icon: 'leaf-outline', level: 66, label: 'Intermedio' },
      { name: 'Firebase', icon: 'logo-firebase', level: 65, label: 'Intermedio' },
      { name: 'SQL Server', icon: 'grid-outline', level: 62, label: 'Intermedio' },
      { name: 'MySQL', icon: 'server-outline', level: 60, label: 'Intermedio' },
    ],
  },
  {
    id: 'movil',
    label: 'Móvil / Multiplataforma',
    icon: 'phone-portrait-outline',
    skills: [
      { name: 'React Native', icon: 'phone-portrait-outline', level: 50, label: 'Intermedio' },
      { name: 'Flutter (Dart)', icon: 'color-filter-outline', level: 45, label: 'Intermedio' },
    ],
  },
  {
    id: 'ia',
    label: 'IA & Integración',
    icon: 'hardware-chip-outline',
    skills: [
      { name: 'APIs REST', icon: 'git-network-outline', level: 70, label: 'Intermedio' },
      { name: 'Git & GitHub', icon: 'logo-github', level: 68, label: 'Intermedio' },
      { name: 'Python IA / LLMs', icon: 'options-outline', level: 55, label: 'Intermedio' },
      { name: 'n8n', icon: 'git-branch-outline', level: 40, label: 'Básico' },
    ],
  },
];