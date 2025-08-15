    // Initial data structure
    let resumeData = {
        personal: {
            fullName: 'Mathieu Nauleau',
            jobTitle: 'Senior Product Designer',
            phone: '+31612345678',
            email: 'hello@gmail.com',
            location: 'Amsterdam',
        },
        summary: 'My 9 years of design experience let me tackle complex challenges at the product, service, and system level in multi-disciplinary teams to make a positive impact on people and business. With elegant digital solutions, I aim for simplicity beyond complexity. In my spare time, I like to cycle, sketch, and practice woodworking.',
        experience: [
            {
                title: 'Product designer',
                company: 'Ahold Delhaize',
                period: '2021-2025',
                location: 'Amsterdam',
                description: `Full-time member of the Albert Heijn Design System team
Enabled more than 20 tech squads by improving the overall consistency and accessibility, while significantly reducing development time & cost
Principal system designer for a multibrand App: Gall&Gall gained 11K App customers and increased revenue by ~160K€ in 3 months
Etos gained 54K App customers and increased revenue by ~570K€ in 6 months
Principal designer on AH Compact. The conversion increased by 8%, and revenue increased by 13% in the last year
Principal designer on AH Overlijers. This proposition saved about 1,7K tons of waste
Overall, involved in the UX Process from the discovery to the implementation`
            },
            {
                title: 'Service designer',
                company: 'Safran Cabin',
                period: '2020',
                location: 'Alkmaar',
                description: `Strategic project about the inflight service ecosystem
Designed at the product, service & system level with an active role from the initial context to the final deliverable
Visualized complex service concepts into structured and clear visuals`
            },
            {
                title: 'Industrial & UX designer',
                company: 'Pezy Group',
                period: '01/2015 - 12/2020',
                location: 'Amsterdam',
                description: `Innovated in a wide variety of projects from product design to User interfaces, graphic design, branding & packaging
Worked with start-ups and multinationals`
            }
        ],
        education: [
            {
                degree: 'Master in industrial design',
                school: "L'École de design Nantes Atlantique",
                period: '09/2010 - 05/2015',
                location: 'Fr'
            },
            {
                degree: 'Bachelor',
                school: 'Milwaukee Institute of Art & Design',
                period: '01/2013 - 12/2013',
                location: 'Milwaukee, USA'
            },
            {
                degree: 'Product Management & Strategy',
                school: 'School or University',
                period: '10/2023 - 12/2023',
                location: 'Location'
            }
        ],
        languages: [
            { name: 'French', level: 'Advanced', proficiency: 3 },
            { name: 'English', level: 'Advanced', proficiency: 3 }
        ],
        skills: ['Figma', 'GitHub', 'Sketch', 'Gmail', 'AB Testing'],
        certification: 'UX Professional Diploma',
        training: 'Building the right things'
    };

    // Initialize the editor
    function initializeEditor() {
        renderExperience();
        renderEducation();
        renderLanguages();
        updatePreview();
    }

    // Render experience section
    function renderExperience() {
        const container = document.getElementById('experienceList');
        container.innerHTML = '';

        resumeData.experience.forEach((exp, index) => {
            const div = document.createElement('div');
            div.className = 'list-item';
            div.innerHTML = `
                <button class="remove-btn" onclick="removeExperience(${index})"><img class="delete-btn" src="./assets/x.svg"/></button>
                <h4>Experience ${index + 1}</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label>Job Title</label>
                        <input type="text" value="${exp.title}" onchange="updateExperience(${index}, 'title', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Company</label>
                        <input type="text" value="${exp.company}" onchange="updateExperience(${index}, 'company', this.value)">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Period</label>
                        <input type="text" value="${exp.period}" onchange="updateExperience(${index}, 'period', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Location</label>
                        <input type="text" value="${exp.location}" onchange="updateExperience(${index}, 'location', this.value)">
                    </div>
                </div>
                <div class="form-group">
                    <label>Description (one achievement per line)</label>
                    <textarea onchange="updateExperience(${index}, 'description', this.value)">${exp.description}</textarea>
                </div>
            `;
            container.appendChild(div);
        });
    }

    // Render education section
    function renderEducation() {
        const container = document.getElementById('educationList');
        container.innerHTML = '';

        resumeData.education.forEach((edu, index) => {
            const div = document.createElement('div');
            div.className = 'list-item';
            div.innerHTML = `
                <button class="remove-btn" onclick="removeEducation(${index})"><img class="delete-btn" src="./assets/x.svg"/></button>
                <h4>Education ${index + 1}</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label>Degree</label>
                        <input type="text" value="${edu.degree}" onchange="updateEducation(${index}, 'degree', this.value)">
                    </div>
                    <div class="form-group">
                        <label>School</label>
                        <input type="text" value="${edu.school}" onchange="updateEducation(${index}, 'school', this.value)">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Period</label>
                        <input type="text" value="${edu.period}" onchange="updateEducation(${index}, 'period', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Location</label>
                        <input type="text" value="${edu.location}" onchange="updateEducation(${index}, 'location', this.value)">
                    </div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    // Render languages section
    function renderLanguages() {
        const container = document.getElementById('languagesList');
        container.innerHTML = '';

        resumeData.languages.forEach((lang, index) => {
            const div = document.createElement('div');
            div.className = 'list-item';
            div.innerHTML = `
                <button class="remove-btn" onclick="removeLanguage(${index})"><img class="delete-btn" src="./assets/x.svg"/></button>
                <h4>Language ${index + 1}</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label>Language</label>
                        <input type="text" value="${lang.name}" onchange="updateLanguage(${index}, 'name', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Level</label>
                        <input type="text" value="${lang.level}" onchange="updateLanguage(${index}, 'level', this.value)">
                    </div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    // Update functions
    function updateExperience(index, field, value) {
        resumeData.experience[index][field] = value;
    }

    function updateEducation(index, field, value) {
        resumeData.education[index][field] = value;
    }

    function updateLanguage(index, field, value) {
        resumeData.languages[index][field] = value;
    }

    function updateLanguageProficiency(index, level) {
        resumeData.languages[index].proficiency = level;
        renderLanguages();
    }

    // Add functions
    function addExperience() {
        resumeData.experience.push({
            title: 'New Position',
            company: 'Company Name',
            period: 'Year',
            location: 'Location',
            description: 'Description of achievements and responsibilities'
        });
        renderExperience();
    }

    function addEducation() {
        resumeData.education.push({
            degree: 'Degree Name',
            school: 'School Name',
            period: 'Year',
            location: 'Location'
        });
        renderEducation();
    }

    function addLanguage() {
        resumeData.languages.push({
            name: 'Language',
            level: 'Level',
            proficiency: 3
        });
        renderLanguages();
    }

    // Remove functions
    function removeExperience(index) {
        resumeData.experience.splice(index, 1);
        renderExperience();
    }

    function removeEducation(index) {
        resumeData.education.splice(index, 1);
        renderEducation();
    }

    function removeLanguage(index) {
        resumeData.languages.splice(index, 1);
        renderLanguages();
    }

    // Update preview
    function updatePreview() {
        // Get current form values
        resumeData.personal = {
            fullName: document.getElementById('fullName').value,
            jobTitle: document.getElementById('jobTitle').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            location: document.getElementById('location').value,
        };
        resumeData.summary = document.getElementById('summary').value;
        resumeData.skills = document.getElementById('skills').value.split(',').map(s => s.trim());
        resumeData.certification = document.getElementById('certification').value;
        resumeData.training = document.getElementById('training').value;

        // Generate resume HTML
        const resumeHTML = generateResumeHTML();
        document.getElementById('resumePreview').innerHTML = resumeHTML;
    }

    // Generate resume HTML
    function generateResumeHTML() {
        const skillsHTML = resumeData.skills.slice(0, 4).map(skill =>
            `<div class="skill-item">${skill}</div>`
        ).join('');

        const additionalSkills = resumeData.skills.slice(4).map(skill =>
            `<div class="skill-item">${skill}</div>`
        ).join('');

        const experienceHTML = resumeData.experience.map(exp => `
            <div class="job">
                <div class="job-title">${exp.title}</div>
                <div class="company">${exp.company}</div>
                <div class="job-meta">
                    ${exp.period} <span class="location">${exp.location}</span>
                </div>
                <ul class="job-description">
                    ${exp.description.split('\n').filter(line => line.trim()).map(line => `<li>${line.trim()}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        const educationHTML = resumeData.education.map(edu => `
            <div class="education-item">
                <div class="degree-name">${edu.degree}</div>
                <div class="school-name">${edu.school}</div>
                <div class="education-meta">${edu.period} ${edu.location}</div>
            </div>
        `).join('');

        const languagesHTML = resumeData.languages.map(lang => `
            <div class="language">
                <div class="language-name">${lang.name}</div>
                <div class="language-level">${lang.level}</div>
            </div>
        `).join('');

        return `
            <div class="resume-container">
                <div class="header">
                    <div class="header-info">
                        <h1 class="name">${resumeData.personal.fullName}</h1>
                        <div class="title">${resumeData.personal.jobTitle}</div>
                        <div class="contact-info">
                            <div class="contact-item">${resumeData.personal.phone}</div>
                            <div class="contact-item">${resumeData.personal.email}</div>
                            <div class="contact-item">${resumeData.personal.location}</div>
                        </div>
                    </div>
                </div>

                <div class="main-content">
                    <div class="left-column">
                        <div class="section">
                            <h2 class="section-title">Experience</h2>
                            ${experienceHTML}
                        </div>

                        <div class="section">
                            <h2 class="section-title">Education</h2>
                            ${educationHTML}
                        </div>
                    </div>

                    <div class="right-column">
                        <div class="section">
                            <h2 class="section-title">Summary</h2>
                            <div class="summary-text">${resumeData.summary}</div>
                        </div>

                        <div class="section">
                            <h2 class="section-title">Certification</h2>
                            <a href="#" class="certification-link">${resumeData.certification}</a>
                        </div>

                        <div class="section">
                            <h2 class="section-title">Training / Courses</h2>
                            <a href="#" class="course-link">${resumeData.training}</a>
                        </div>

                        <div class="section">
                            <h2 class="section-title">Languages</h2>
                            <div class="languages">
                                ${languagesHTML}
                            </div>
                        </div>

                        <div class="section">
                            <h2 class="section-title">Skills</h2>
                            <div class="skills-grid">
                                ${skillsHTML}
                                ${additionalSkills}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Save as HTML
    function saveAsHTML() {
        updatePreview();
        const resumeHTML = generateCompleteHTML();
        const blob = new Blob([resumeHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${resumeData.personal.fullName.replace(/\s+/g, '_')}_resume.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Generate complete HTML for download
    function generateCompleteHTML() {
        const resumeContent = generateResumeHTML();
        return `
        <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${resumeData.personal.fullName} - Resume</title>
            <link href="resume.css" rel="stylesheet" />

            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
                rel="stylesheet">
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
                rel="stylesheet">

        </head>
    <body>
        ${resumeContent}
    </body>
    </html>`;
    }

    // Generate PDF
    function generatePDF() {
        updatePreview();
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        const resumeHTML = generateCompleteHTML();

        printWindow.document.write(resumeHTML);
        printWindow.document.close();

        // Wait for content to load then print
        printWindow.onload = function () {
            setTimeout(() => {
                printWindow.print();
                // Don't automatically close the window, let user decide
            }, 500);
        };
    }

    // Auto-update preview when typing
    document.addEventListener('DOMContentLoaded', function () {
        initializeEditor();

        // Add event listeners for auto-update
        const inputs = ['fullName', 'jobTitle', 'phone', 'email', 'location', 'summary', 'skills', 'certification', 'training'];
        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', updatePreview);
            }
        });
    });

    // Save data to localStorage for persistence (optional enhancement)
    function saveToLocalStorage() {
        try {
            localStorage.setItem('resumeData', JSON.stringify(resumeData));
        } catch (e) {
            console.warn('Could not save to localStorage');
        }
    }

    function loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('resumeData');
            if (saved) {
                resumeData = JSON.parse(saved);
                // Update form fields with loaded data
                document.getElementById('fullName').value = resumeData.personal.fullName;
                document.getElementById('jobTitle').value = resumeData.personal.jobTitle;
                document.getElementById('phone').value = resumeData.personal.phone;
                document.getElementById('email').value = resumeData.personal.email;
                document.getElementById('location').value = resumeData.personal.location;
                document.getElementById('initials').value = resumeData.personal.initials;
                document.getElementById('summary').value = resumeData.summary;
                document.getElementById('certification').value = resumeData.certification;
                document.getElementById('training').value = resumeData.training;
            }
        } catch (e) {
            console.warn('Could not load from localStorage');
        }
    }