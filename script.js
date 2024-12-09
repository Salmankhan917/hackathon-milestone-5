// Handle form submission
document.getElementById('resumeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    const userName = document.getElementById('UserName').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;

    // Generate resume content
    const resumeContent = `
        <h2>${fullName}'s Resume</h2>
        <p><strong>Username:</strong> ${userName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Experience</h3>
        <p>${experience}</p>
        <h3>Skills</h3>
        <p>${skills}</p>
    `;

    // Display the resume
    const resumeDisplay = document.getElementById('resumeDisplay');
    resumeDisplay.innerHTML = resumeContent;

    // Generate shareable link
    const encodedContent = encodeURIComponent(resumeContent);
    const shareableLink = `${window.location.origin}?resume=${encodedContent}`;

    // Display the shareable link
    const linkContainer = document.getElementById('shareable-link-container');
    const linkInput = document.getElementById('shareable-link');
    linkInput.value = shareableLink;
    linkContainer.style.display = 'block';
});

// Load resume from shareable link
window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeParam = urlParams.get('resume');
    if (resumeParam) {
        const decodedContent = decodeURIComponent(resumeParam);
        document.getElementById('resumeDisplay').innerHTML = decodedContent;
    }
});

// Download as PDF
document.getElementById('download-pdf').addEventListener('click', function () {
    const element = document.getElementById('resumeDisplay');
    const opt = {
        margin: 1,
        filename: 'resume.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
});
