document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
    mobileMenu.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { mobileMenu.classList.add('hidden'); }); });
    
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); } });
    }, { threshold: 0.1 });
    sections.forEach(section => { observer.observe(section); });

    const navLinks = document.querySelectorAll('nav a.nav-link');
    const allSections = document.querySelectorAll('main section');
    window.addEventListener('scroll', () => {
        let current = 'home';
        allSections.forEach(section => { if (pageYOffset >= section.offsetTop - 100) { current = section.getAttribute('id'); } });
        navLinks.forEach(link => {
            link.classList.remove('active', 'text-teal-400');
            link.classList.add('text-slate-300');
            if (link.href.includes(current)) {
                link.classList.add('active', 'text-teal-400');
                link.classList.remove('text-slate-300');
            }
        });
    });

    const skillsData = {
        'Languages': ['Python', 'SQL', 'C++', 'MATLAB'],
        'Libraries': ['Scikit-learn', 'PyTorch', 'TensorFlow', 'Pandas', 'NumPy', 'Seaborn'],
        'Tools & APIs': ['XTS API', 'Bloomberg', 'Trading Tech', 'Reuters', 'Tableau', 'Shell', 'REST APIs'],
        'Concepts': ['Risk Modeling', 'Monte Carlo', 'Market Micro', 'Low-Latency']
    };

    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(skillsData),
            datasets: [{
                label: 'Number of Skills',
                data: Object.values(skillsData).map(arr => arr.length),
                backgroundColor: [
                    'rgba(20, 184, 166, 0.4)',
                    'rgba(14, 165, 233, 0.4)',
                    'rgba(139, 92, 246, 0.4)',
                    'rgba(236, 72, 153, 0.4)'
                ],
                borderColor: [
                    'rgba(45, 212, 191, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(167, 139, 250, 1)',
                    'rgba(244, 114, 182, 1)'
                ],
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#94a3b8', font: { weight: 'bold' } } },
                y: { grid: { display: false }, ticks: { color: '#e2e8f0', font: { size: 14, weight: 'bold' } } }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#1e293b',
                    titleFont: { size: 16, weight: 'bold' },
                    bodyFont: { size: 14 },
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            const category = context.label;
                            const skills = skillsData[category];
                            return skills.join(', ');
                        }
                    }
                }
            }
        }
    });
});

// Theme toggle logic
function setTheme(theme){
    if(theme === 'light'){
        document.documentElement.setAttribute('data-theme','light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
    updateThemeButtons(theme);
}

function updateThemeButtons(theme){
    const btn = document.getElementById('theme-toggle');
    const btnMobile = document.getElementById('theme-toggle-mobile');
    if(btn) btn.textContent = theme === 'light' ? '☀️' : '🌙';
    if(btnMobile) btnMobile.textContent = theme === 'light' ? 'Switch to dark' : 'Switch to light';
}

document.addEventListener('DOMContentLoaded', ()=>{
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    const btn = document.getElementById('theme-toggle');
    const btnMobile = document.getElementById('theme-toggle-mobile');
    if(btn) btn.addEventListener('click', ()=> setTheme(localStorage.getItem('theme') === 'light' ? 'dark' : 'light'));
    if(btnMobile) btnMobile.addEventListener('click', ()=> setTheme(localStorage.getItem('theme') === 'light' ? 'dark' : 'light'));
});
