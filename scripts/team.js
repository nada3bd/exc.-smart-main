/* FILENAME: scripts/team.js */
// Team page rendering logic

import { teamMembers } from './team-data.js';

export function renderTeamPage() {
    const container = document.querySelector('#app-container');
    if (!container) {
        console.warn('Team page: app-container not found');
        return;
    }

    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid) {
        console.warn('Team page: team-grid not found, retrying...');
        // Retry after a short delay in case DOM isn't ready yet
        setTimeout(() => {
            const retryGrid = document.querySelector('.team-grid');
            if (retryGrid) {
                renderTeamCards(retryGrid);
            } else {
                console.error('Team page: team-grid still not found after retry');
            }
        }, 200);
        return;
    }

    renderTeamCards(teamGrid);
}

function renderTeamCards(teamGrid) {
    // Clear existing cards
    teamGrid.innerHTML = '';

    // Render each team member card
    teamMembers.forEach(member => {
        const card = createTeamCard(member);
        teamGrid.appendChild(card);
    });
    
    // Add robot container as a grid item (positioned after Noor in the empty space)
    const robotContainer = createRobotContainer();
    teamGrid.appendChild(robotContainer);
}

function createRobotContainer() {
    const container = document.createElement('div');
    container.className = 'ai-robot-container robot-grid-item';
    container.innerHTML = `
        <svg class="ai-robot-illustration" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
            <!-- Head -->
            <g class="robot-head">
                <ellipse cx="100" cy="60" rx="35" ry="40" fill="#00668c" opacity="0.9" class="robot-head-base robot-light"/>
                <ellipse cx="100" cy="60" rx="30" ry="35" fill="#004d66" opacity="0.8" class="robot-head-inner robot-light"/>
                <!-- Eyes -->
                <circle cx="90" cy="55" r="4" fill="#fffefb" class="robot-eye-left"/>
                <circle cx="110" cy="55" r="4" fill="#fffefb" class="robot-eye-right"/>
                <!-- Hair/Headpiece -->
                <path d="M 70 45 Q 100 30 130 45 Q 130 25 100 20 Q 70 25 70 45" fill="#00668c" opacity="0.85" class="robot-hair robot-light"/>
                <!-- Antenna -->
                <line x1="100" y1="20" x2="100" y2="5" stroke="#00668c" stroke-width="2" class="robot-antenna robot-light"/>
                <circle cx="100" cy="5" r="3" fill="#00668c" class="robot-antenna-tip robot-light"/>
            </g>
            
            <!-- Body -->
            <g class="robot-body">
                <rect x="70" y="100" width="60" height="80" rx="8" fill="#00668c" opacity="0.9" class="robot-torso robot-light"/>
                <rect x="75" y="105" width="50" height="70" rx="5" fill="#004d66" opacity="0.8" class="robot-body-inner robot-light"/>
                <!-- Chest Panel -->
                <circle cx="100" cy="140" r="12" fill="#00668c" opacity="0.7" class="robot-chest-panel robot-light"/>
                <circle cx="100" cy="140" r="8" fill="#fffefb" opacity="0.8" class="robot-chest-core"/>
            </g>
            
            <!-- Arms -->
            <g class="robot-arms">
                <!-- Left Arm -->
                <rect x="50" y="110" width="20" height="50" rx="10" fill="#00668c" opacity="0.9" class="robot-arm-left robot-light"/>
                <circle cx="60" cy="165" r="8" fill="#004d66" class="robot-hand-left robot-light"/>
                <!-- Right Arm -->
                <rect x="130" y="110" width="20" height="50" rx="10" fill="#00668c" opacity="0.9" class="robot-arm-right robot-light"/>
                <circle cx="140" cy="165" r="8" fill="#004d66" class="robot-hand-right robot-light"/>
            </g>
            
            <!-- Legs -->
            <g class="robot-legs">
                <!-- Left Leg -->
                <rect x="80" y="180" width="25" height="60" rx="12" fill="#00668c" opacity="0.9" class="robot-leg-left robot-light"/>
                <ellipse cx="92.5" cy="245" rx="12" ry="8" fill="#004d66" class="robot-foot-left robot-light"/>
                <!-- Right Leg -->
                <rect x="95" y="180" width="25" height="60" rx="12" fill="#00668c" opacity="0.9" class="robot-leg-right robot-light"/>
                <ellipse cx="107.5" cy="245" rx="12" ry="8" fill="#004d66" class="robot-foot-right robot-light"/>
            </g>
            
            <!-- Decorative Elements -->
            <g class="robot-decorations">
                <circle cx="85" cy="120" r="2" fill="#00668c" opacity="0.7" class="robot-dot-1 robot-light"/>
                <circle cx="115" cy="120" r="2" fill="#00668c" opacity="0.7" class="robot-dot-2 robot-light"/>
                <circle cx="85" cy="160" r="2" fill="#00668c" opacity="0.7" class="robot-dot-3 robot-light"/>
                <circle cx="115" cy="160" r="2" fill="#00668c" opacity="0.7" class="robot-dot-4 robot-light"/>
            </g>
        </svg>
    `;
    return container;
}

function createTeamCard(member) {
    const card = document.createElement('div');
    card.className = 'bg-primary-color dark:bg-dark-card rounded-xl shadow-sm overflow-hidden text-center hover-card team-card';
    
    card.innerHTML = `
        <div class="relative overflow-hidden">
            <img 
                src="${member.image}" 
                alt="${member.name}" 
                class="w-full h-64 object-cover team-member-image"
                loading="lazy"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div class="p-6">
            <h3 class="text-lg font-bold text-primary-color dark:text-white mb-1">${member.name}</h3>
            <p class="text-ai-600 text-sm mb-4">${member.role}</p>
            <div class="flex justify-center space-x-4 text-muted-color">
                ${member.social.linkedin !== '#' ? `
                    <a href="${member.social.linkedin}" target="_blank" rel="noopener noreferrer" 
                       class="hover:text-ai-600 transition-colors duration-200" 
                       aria-label="${member.name} LinkedIn">
                        <i class="fa-brands fa-linkedin text-xl"></i>
                    </a>
                ` : ''}
                ${member.social.email !== '#' ? `
                    <a href="mailto:${member.social.email}" 
                       class="hover:text-ai-600 transition-colors duration-200" 
                       aria-label="${member.name} Email">
                        <i class="fa-solid fa-envelope text-xl"></i>
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// This function is called directly by the router when team page loads

