import { jsPDF } from 'jspdf';

export const generateCoverPDF = (coverDetails, doc, pageWidth, pageHeight, coverType = 'assignment') => {
  try {
    // Professional border with gradient effect
    doc.setDrawColor(50, 50, 50);
    doc.setLineWidth(0.7);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20); // Outer border
    doc.setDrawColor(80, 80, 80);
    doc.setLineWidth(0.5);
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24); // Mid border
    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.3);
    doc.rect(14, 14, pageWidth - 28, pageHeight - 28); // Inner border

    // Enhanced decorative corners
    const cornerSize = 15;
    doc.setDrawColor(100, 100, 100);
    doc.circle(10, 10, cornerSize, 'S');
    doc.circle(pageWidth - 10, 10, cornerSize, 'S');
    doc.circle(10, pageHeight - 10, cornerSize, 'S');
    doc.circle(pageWidth - 10, pageHeight - 10, cornerSize, 'S');

    // University Name with elegant styling
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text('BANGLADESH UNIVERSITY OF', pageWidth / 2, 30, { align: 'center' });
    doc.text('BUSINESS AND TECHNOLOGY', pageWidth / 2, 40, { align: 'center' });

    // Stylish underline for university name
    doc.setLineWidth(1);
    doc.setDrawColor(0, 0, 255);
    doc.line(pageWidth / 2 - 75, 44, pageWidth / 2 + 75, 44);
    doc.setDrawColor(255, 0, 0);
    doc.line(pageWidth / 2 - 70, 45, pageWidth / 2 + 70, 45);

    // Motto with serif font
    doc.setFont("times", "italic");
    doc.setFontSize(12);
    doc.text('Committed to Academic Excellence', pageWidth / 2, 55, { align: 'center' });

    // Dynamic heading based on cover type
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    const headingText = coverType === 'lab-report' ? 'Lab Report' : 'Assignment';
    doc.text(headingText, pageWidth / 2, 75, { align: 'center' });

    // Gradient decorative lines around heading
    const headingWidth = doc.getTextWidth(headingText);
    doc.setDrawColor(0, 255, 0);
    doc.setLineWidth(1);
    doc.line(pageWidth / 2 - headingWidth / 2 - 30, 75, pageWidth / 2 - headingWidth / 2 - 10, 75);
    doc.line(pageWidth / 2 + headingWidth / 2 + 10, 75, pageWidth / 2 + headingWidth / 2 + 30, 75);

    // Enhanced course details box
    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 250);
    doc.roundedRect(20, 90, pageWidth - 40, coverType === 'lab-report' ? 50 : 40, 5, 5, 'FD');
    doc.setFontSize(12);

    // Course Title and details
    doc.setFont("helvetica", "bold");
    doc.text('Course Title:', 25, 100);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.courseTitle, 90, 100);

    doc.setFont("helvetica", "bold");
    doc.text('Course Code:', 25, 110);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.courseCode, 90, 110);

    if (coverType === 'assignment') {
      doc.setFont("helvetica", "bold");
      doc.text('Assignment No:', 25, 120);
      doc.setFont("helvetica", "normal");
      doc.text(coverDetails.assignmentNo, 90, 120);
    } else {
      doc.setFont("helvetica", "bold");
      doc.text('Experiment No:', 25, 120);
      doc.setFont("helvetica", "normal");
      doc.text(coverDetails.experimentNo, 90, 120);

      doc.setFont("helvetica", "bold");
      doc.text('Experiment Name:', 25, 130);
      doc.setFont("helvetica", "normal");
      doc.text(coverDetails.experimentName, 90, 130);
    }

    // Submission details section
    const boxY = coverType === 'lab-report' ? 150 : 140;
    const boxHeight = 80;
    const boxWidth = 85;

    // Submitted By box
    doc.setFillColor(240, 248, 255);
    doc.roundedRect(20, boxY, boxWidth, boxHeight, 5, 5, 'FD');
    doc.setDrawColor(0);
    doc.roundedRect(20, boxY, boxWidth, boxHeight, 5, 5, 'S');
    doc.setFont("helvetica", "bold");
    doc.text('Submitted By:', 25, boxY + 12);

    doc.text('Name:', 25, boxY + 25);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.studentName, 70, boxY + 25);

    doc.setFont("helvetica", "bold");
    doc.text('ID No:', 25, boxY + 38);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.studentId, 70, boxY + 38);

    doc.setFont("helvetica", "bold");
    doc.text('Intake:', 25, boxY + 51);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.intake, 70, boxY + 51);

    doc.setFont("helvetica", "bold");
    doc.text('Section:', 25, boxY + 64);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.section, 70, boxY + 64);

    // Submitted To box
    doc.setFillColor(240, 248, 255);
    doc.roundedRect(pageWidth - 105, boxY, boxWidth, boxHeight, 5, 5, 'FD');
    doc.setDrawColor(0);
    doc.roundedRect(pageWidth - 105, boxY, boxWidth, boxHeight, 5, 5, 'S');
    doc.setFont("helvetica", "bold");
    doc.text('Submitted To:', pageWidth - 100, boxY + 12);

    doc.text('Name:', pageWidth - 100, boxY + 25);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.instructorName, pageWidth - 60, boxY + 25);

    doc.setFont("helvetica", "bold");
    doc.text('Department of:', pageWidth - 100, boxY + 38);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.department, pageWidth - 100, boxY + 48);

    doc.setFont("helvetica", "normal");
    doc.text('Bangladesh University of', pageWidth - 100, boxY + 61);
    doc.text('Business & Technology', pageWidth - 100, boxY + 71);

    // Submission date section
    const dateY = boxY + boxHeight + 20;
    doc.setFont("helvetica", "normal");
    doc.text(`Date of Submission: ${coverDetails.submissionDate}`, 20, dateY);

    // Signature section
    const signatureY = dateY + 30;
    doc.setDrawColor(100);
    doc.setLineWidth(0.7);
    doc.line(20, signatureY, 80, signatureY);
    doc.line(pageWidth - 80, signatureY, pageWidth - 20, signatureY);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text('Student Signature', 20, signatureY + 10);
    doc.text('Teacher Signature', pageWidth - 80, signatureY + 10);

    return doc;
  } catch (error) {
    console.error("Error in PDF generation:", error);
    throw error;
  }
};

export default generateCoverPDF;
