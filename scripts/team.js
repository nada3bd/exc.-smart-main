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

