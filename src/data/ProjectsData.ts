export interface Project {
  id: string;
  icon: string;
  title: string;
  description: string;
  coverImage: string;
  shortDescription: string;
  technologies: string[];
  overview: string;
  features: string[];
  challenge?: string;
  outcome?: string;
}

export const projects: Project[] = [
  {
    id: "netpractice",
    icon: "ph-network",
    title: "netpractice",
    description: "Hands-on networking project focused on debugging and configuring broken network topologies.",
    coverImage: "/assets/netpractice-cover.jpg",
    shortDescription: "Network configuration challenge",
    technologies: ["Networking", "TCP/IP", "Subnetting", "Routing"],
    overview: "A set of 10 progressively complex networking scenarios focused on IP addressing, subnetting, routing, and troubleshooting. Each level requires analyzing a broken network topology and applying correct configurations to restore connectivity.",
    features: [
      "Network topology understanding",
      "Subnet mask calculation",
      "Routing configuration"
    ],
    challenge: "Mastering complex network layers and configurations",
    outcome: "Practical understanding of networking fundamentals"
  },
  {
    id: "webserv",
    icon: "ph-hard-drives",
    title: "webserv",
    description: "Implementation of an HTTP server in C++ following RFC basics and real browser testing.",
    coverImage: "/assets/webserv-cover.jpg",
    shortDescription: "HTTP server implementation",
    technologies: ["C++", "HTTP", "Networking", "Server Development"],
    overview: "Implementation of an HTTP server in C++ handling request parsing, routing, configuration files, error handling, and persistent connections. The server supports static file serving and can be tested in any standard browser.",
    features: [
      "HTTP request parsing",
      "Response generation",
      "Connection handling",
      "Configuration system"
    ],
    challenge: "Implementing HTTP protocol specifications correctly",
    outcome: "Fully functional HTTP server with robust error handling"
  },
  {
    id: "inception",
    icon: "ph-cloud",
    title: "inception",
    description: "Setup of a containerized infrastructure using Docker Compose with NGINX, WordPress, and MariaDB.",
    coverImage: "/assets/inception-cover.jpg",
    shortDescription: "Docker infrastructure project",
    technologies: ["Docker", "Docker Compose", "Linux", "Infrastructure"],
    overview: "Containerized infrastructure using Docker Compose to deploy NGINX (with SSL), WordPress with PHP-FPM, and a MariaDB database. The project focuses on service orchestration, network isolation, volumes, and secure deployment within a custom VM.",
    features: [
      "Container orchestration",
      "Service networking",
      "Volume management",
      "Environment configuration"
    ],
    challenge: "Orchestrating multiple services with Docker",
    outcome: "Complete containerized application stack"
  },
  {
    id: "ft_transcendence",
    icon: "ph-star-four",
    title: "ft_transcendence",
    description: "Full-stack web application built with TypeScript, real-time features, and modular architecture.",
    coverImage: "/assets/ft_transcendence-cover.jpg",
    shortDescription: "Full-stack web application",
    technologies: ["Node.js", "TailwindCSS", "WebSockets", "TypeScript", "Fastify"],
    overview: "Full-stack web application built with TypeScript and Fastify, featuring authentication, real-time gameplay via WebSockets, REST API endpoints, and a modular architecture. The project integrates both front-end and back-end components into a deployable product.",
    features: [
      "Real-time multiplayer functionality",
      "User authentication and authorization",
      "Database design and optimization",
      "REST API implementation"
    ],
    challenge: "Integrating complex systems into a cohesive application",
    outcome: "Fully deployable full-stack web application with real-time features"
  }
];
