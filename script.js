// Terminal functionality
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const commandHistory = [];
let historyIndex = -1;

// DevOps Engineer profile data
const profile = {
    name: 'Gibson Ekezie',
    title: 'DevOps Engineer',
    email: 'contact@gibsonekezie.com',
    github: 'https://github.com/gibsonekezie',
    linkedin: 'https://linkedin.com/in/gibsonekezie',
    skills: [
        'Docker & Kubernetes',
        'CI/CD Pipelines (Jenkins, GitLab CI, GitHub Actions)',
        'Cloud Platforms (AWS, Azure, GCP)',
        'Infrastructure as Code (Terraform, Ansible)',
        'Monitoring & Logging (Prometheus, Grafana, ELK Stack)',
        'Scripting (Bash, Python, JavaScript)',
        'Version Control (Git)',
        'Linux System Administration'
    ],
    experience: [
        'Building and maintaining CI/CD pipelines',
        'Container orchestration with Kubernetes',
        'Infrastructure automation and provisioning',
        'Cloud architecture and deployment',
        'System monitoring and optimization'
    ]
};

// Available commands
const commands = {
    help: {
        description: 'Show available commands',
        execute: () => {
            let output = '\nAvailable commands:\n\n';
            Object.keys(commands).forEach(cmd => {
                output += `  ${cmd.padEnd(15)} - ${commands[cmd].description}\n`;
            });
            return output;
        }
    },
    about: {
        description: 'Display information about me',
        execute: () => {
            return `\n${profile.name} - ${profile.title}\n\nI'm a passionate DevOps Engineer focused on automation, cloud infrastructure,\nand building reliable, scalable systems. I love working with cutting-edge\ntechnologies to streamline development workflows and improve deployment processes.\n`;
        }
    },
    skills: {
        description: 'List technical skills',
        execute: () => {
            let output = '\nTechnical Skills:\n\n';
            profile.skills.forEach((skill, index) => {
                output += `  ${(index + 1).toString().padStart(2)}. ${skill}\n`;
            });
            return output;
        }
    },
    experience: {
        description: 'Show work experience highlights',
        execute: () => {
            let output = '\nExperience Highlights:\n\n';
            profile.experience.forEach((exp, index) => {
                output += `  • ${exp}\n`;
            });
            return output;
        }
    },
    contact: {
        description: 'Display contact information',
        execute: () => {
            return `\nContact Information:\n\n  Email:    ${profile.email}\n  GitHub:   ${profile.github}\n  LinkedIn: ${profile.linkedin}\n`;
        }
    },
    projects: {
        description: 'View my projects',
        execute: () => {
            return `\nProjects:\n\n  Check out my work on GitHub: ${profile.github}\n\n  Featured projects include:\n  • Infrastructure automation tools\n  • CI/CD pipeline templates\n  • Kubernetes deployment configurations\n  • Monitoring and alerting solutions\n`;
        }
    },
    whoami: {
        description: 'Display current user',
        execute: () => {
            return 'gibson';
        }
    },
    date: {
        description: 'Display current date and time',
        execute: () => {
            return new Date().toString();
        }
    },
    echo: {
        description: 'Echo the input text',
        execute: (args) => {
            return args.join(' ');
        }
    },
    clear: {
        description: 'Clear the terminal screen',
        execute: () => {
            terminalOutput.innerHTML = '';
            return '';
        }
    },
    ls: {
        description: 'List directory contents',
        execute: () => {
            return 'about.txt  skills.txt  experience.txt  contact.txt  projects.txt';
        }
    },
    pwd: {
        description: 'Print working directory',
        execute: () => {
            return '/home/gibson';
        }
    },
    uname: {
        description: 'Print system information',
        execute: () => {
            return 'Linux gibson-devops 5.15.0 #1 SMP x86_64 GNU/Linux';
        }
    },
    banner: {
        description: 'Display welcome banner',
        execute: () => {
            return `
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   Welcome to Gibson Ekezie's Terminal                       ║
║   DevOps Engineer | Cloud Architect | Automation Expert     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`;
        }
    }
};

// Add command to output
function addOutput(content, className = '') {
    const outputDiv = document.createElement('div');
    outputDiv.className = `output ${className}`;
    outputDiv.innerHTML = content;
    terminalOutput.appendChild(outputDiv);
}

// Add command line to output
function addCommandLine(command) {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'terminal-line';
    lineDiv.innerHTML = `<span class="prompt">gibson@devops:~$</span> <span class="command">${command}</span>`;
    terminalOutput.appendChild(lineDiv);
}

// Execute command
function executeCommand(input) {
    const trimmedInput = input.trim();
    
    if (!trimmedInput) {
        return;
    }
    
    // Add to history
    commandHistory.unshift(trimmedInput);
    historyIndex = -1;
    
    // Add command to output
    addCommandLine(trimmedInput);
    
    // Parse command and arguments
    const parts = trimmedInput.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    // Execute command
    if (commands[command]) {
        const result = commands[command].execute(args);
        if (result) {
            addOutput(result);
        }
    } else {
        addOutput(`bash: ${command}: command not found`, 'error');
    }
    
    // Scroll to bottom
    terminalOutput.parentElement.scrollTop = terminalOutput.parentElement.scrollHeight;
}

// Handle input
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value;
        executeCommand(input);
        terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        } else if (historyIndex === 0) {
            historyIndex = -1;
            terminalInput.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const input = terminalInput.value.toLowerCase();
        const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
        if (matches.length === 1) {
            terminalInput.value = matches[0];
        } else if (matches.length > 1) {
            addCommandLine(input);
            addOutput(matches.join('  '));
        }
    }
});

// Keep focus on input
document.addEventListener('click', () => {
    terminalInput.focus();
});

// Initial focus
terminalInput.focus();
