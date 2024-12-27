import { jsPDF } from 'jspdf';

export const generateCoverPDF = (coverDetails, doc, pageWidth, pageHeight, coverType = 'assignment') => {
  try {
    // Add page border with gradient effect
    doc.setDrawColor(50, 50, 150);
    doc.setLineWidth(0.7);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20); // Outer border
    doc.setLineWidth(0.4);
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24); // Inner border

    // University Name with modern font styling
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text('BANGLADESH UNIVERSITY OF', pageWidth / 2, 30, { align: 'center' });
    doc.text('BUSINESS AND TECHNOLOGY', pageWidth / 2, 38, { align: 'center' });

    // Decorative line under university name
    doc.setLineWidth(0.5);
    doc.setDrawColor(50, 100, 200);
    doc.line(pageWidth / 2 - 70, 42, pageWidth / 2 + 70, 42);

    // Motto with modern font styling
    doc.setFont("courier", "italic");
    doc.setFontSize(12);
    doc.text('Committed to Academic Excellence', pageWidth / 2, 50, { align: 'center' });

    // Dynamic heading
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    const headingText = coverType === 'lab-report' ? 'Lab Report' : 'Assignment';
    doc.text(headingText, pageWidth / 2, 70, { align: 'center' });

    // Decorative lines around heading
    const headingWidth = doc.getTextWidth(headingText);
    doc.setDrawColor(0, 0, 0);
    doc.line(pageWidth / 2 - headingWidth / 2 - 25, 70, pageWidth / 2 - headingWidth / 2 - 5, 70);
    doc.line(pageWidth / 2 + headingWidth / 2 + 5, 70, pageWidth / 2 + headingWidth / 2 + 25, 70);

    // Course details section
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(20, 85, pageWidth - 40, coverType === 'lab-report' ? 50 : 40, 4, 4, 'F');
    doc.setFontSize(11);

    doc.setFont("helvetica", "bold");
    doc.text('Course Title:', 25, 95);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.courseTitle, 85, 95);

    doc.setFont("helvetica", "bold");
    doc.text('Course Code:', 25, 105);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.courseCode, 85, 105);

    if (coverType === 'assignment') {
      doc.setFont("helvetica", "bold");
      doc.text('Assignment No:', 25, 115);
      doc.setFont("helvetica", "normal");
      doc.text(coverDetails.assignmentNo, 85, 115);
    } else {
      doc.setFont("helvetica", "bold");
      doc.text('Experiment No:', 25, 115);
      doc.setFont("helvetica", "normal");
      doc.text(coverDetails.experimentNo, 85, 115);

      doc.setFont("helvetica", "bold");
      doc.text('Experiment Name:', 25, 125);
      doc.setFont("helvetica", "normal");
      doc.text(coverDetails.experimentName, 85, 125);
    }

    const boxY = coverType === 'lab-report' ? 145 : 135;

    // Submission Details - Modern Boxes
    const boxHeight = 70;
    const boxWidth = 80;

    // Submitted By box
    doc.setFillColor(240, 240, 255);
    doc.roundedRect(20, boxY, boxWidth, boxHeight, 3, 3, 'F');
    doc.setFont("helvetica", "bold");
    doc.text('Submitted By:', 25, boxY + 10);
    doc.text('Name:', 25, boxY + 20);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.studentName, 60, boxY + 20);

    doc.setFont("helvetica", "bold");
    doc.text('ID No:', 25, boxY + 30);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.studentId, 60, boxY + 30);

    doc.setFont("helvetica", "bold");
    doc.text('Intake:', 25, boxY + 40);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.intake, 60, boxY + 40);

    doc.setFont("helvetica", "bold");
    doc.text('Section:', 25, boxY + 50);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.section, 60, boxY + 50);

    doc.setFont("helvetica", "bold");
    doc.text('Program:', 25, boxY + 60);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.program, 60, boxY + 60);

    // Submitted To box
    doc.setFillColor(240, 240, 255);
    doc.roundedRect(pageWidth - 100, boxY, boxWidth, boxHeight, 3, 3, 'F');
    doc.setFont("helvetica", "bold");
    doc.text('Submitted To:', pageWidth - 95, boxY + 10);
    doc.text('Name:', pageWidth - 95, boxY + 20);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.instructorName, pageWidth - 60, boxY + 20);

    doc.setFont("helvetica", "bold");
    doc.text('Department of:', pageWidth - 95, boxY + 30);
    doc.setFont("helvetica", "normal");
    doc.text(coverDetails.department, pageWidth - 95, boxY + 40);

    doc.text('Bangladesh University of', pageWidth - 95, boxY + 50);
    doc.text('Business & Technology', pageWidth - 95, boxY + 60);

    // Submission date
    const dateY = boxY + boxHeight + 15;
    doc.setFont("helvetica", "normal");
    doc.text(`Date of Submission: ${coverDetails.submissionDate}`, 20, dateY + 10);

    // Signatures
    const signatureY = dateY + 30;
    doc.setLineWidth(0.5);
    doc.line(20, signatureY, 80, signatureY); // Student signature line
    doc.line(pageWidth - 80, signatureY, pageWidth - 20, signatureY); // Teacher signature line

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text('Student Signature', 20, signatureY + 5);
    doc.text('Teacher Signature', pageWidth - 80, signatureY + 5);

    return doc;
  } catch (error) {
    console.error("Error in PDF generation:", error);
    throw error;
  }
};

export default generateCoverPDF;
