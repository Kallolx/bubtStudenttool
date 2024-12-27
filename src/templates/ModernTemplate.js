import { jsPDF } from 'jspdf';

export const generateCoverPDF = (coverDetails, doc, pageWidth, pageHeight, coverType = 'assignment') => {
  try {
    // Add page border with double lines
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20); // Outer border
    doc.setLineWidth(0.3);
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24); // Inner border

    // Add decorative corner elements
    const cornerSize = 10;
    // Top left corner
    doc.line(10, 15, 20, 15);
    doc.line(15, 10, 15, 20);
    // Top right corner
    doc.line(pageWidth - 20, 15, pageWidth - 10, 15);
    doc.line(pageWidth - 15, 10, pageWidth - 15, 20);
    // Bottom left corner
    doc.line(10, pageHeight - 15, 20, pageHeight - 15);
    doc.line(15, pageHeight - 20, 15, pageHeight - 10);
    // Bottom right corner
    doc.line(pageWidth - 20, pageHeight - 15, pageWidth - 10, pageHeight - 15);
    doc.line(pageWidth - 15, pageHeight - 20, pageWidth - 15, pageHeight - 10);

    // University Name with better styling
    doc.setFontSize(16);
    doc.setFont("times", "bold");
    doc.text('BANGLADESH UNIVERSITY OF', pageWidth / 2, 30, { align: 'center' });
    doc.text('BUSINESS AND TECHNOLOGY', pageWidth / 2, 38, { align: 'center' });

    // Decorative line under university name
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 2 - 70, 42, pageWidth / 2 + 70, 42);
    doc.setLineWidth(0.3);
    doc.line(pageWidth / 2 - 65, 43, pageWidth / 2 + 65, 43);

    // Motto with italic style
    doc.setFont("times", "italic");
    doc.setFontSize(11);
    doc.text('Committed to Academic Excellence', pageWidth / 2, 50, { align: 'center' });

    // Dynamic heading based on cover type
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    const headingText = coverType === 'lab-report' ? 'Lab Report' : 'Assignment';
    doc.text(headingText, pageWidth / 2, 70, { align: 'center' });
    
    // Decorative lines around heading
    const headingWidth = doc.getTextWidth(headingText);
    doc.setLineWidth(0.5);
    // Left decorative element
    doc.line(pageWidth / 2 - headingWidth / 2 - 20, 70, pageWidth / 2 - headingWidth / 2 - 5, 70);
    // Right decorative element
    doc.line(pageWidth / 2 + headingWidth / 2 + 5, 70, pageWidth / 2 + headingWidth / 2 + 20, 70);

    // Course details section with box
    doc.setDrawColor(0);
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(20, 85, pageWidth - 40, coverType === 'lab-report' ? 45 : 35, 3, 3, 'F');
    doc.setFontSize(11);

    // Course Title with different font weights
    doc.setFont("times", "bold");
    doc.text('Course Title:', 25, 95);
    doc.setFont("times", "normal");
    doc.text(coverDetails.courseTitle, 85, 95);

    // Course Code with different font weights
    doc.setFont("times", "bold");
    doc.text('Course Code:', 25, 105);
    doc.setFont("times", "normal");
    doc.text(coverDetails.courseCode, 85, 105);

    // Assignment/Experiment details with different font weights
    if (coverType === 'assignment') {
      doc.setFont("times", "bold");
      doc.text('Assignment No:', 25, 115);
      doc.setFont("times", "normal");
      doc.text(coverDetails.assignmentNo, 85, 115);
    } else {
      doc.setFont("times", "bold");
      doc.text('Experiment No:', 25, 115);
      doc.setFont("times", "normal");
      doc.text(coverDetails.experimentNo, 85, 115);
      
      doc.setFont("times", "bold");
      doc.text('Experiment Name:', 25, 125);
      doc.setFont("times", "normal");
      doc.text(coverDetails.experimentName, 85, 125);
    }

    // Adjust the starting Y position for the boxes based on cover type
    const boxY = coverType === 'lab-report' ? 145 : 135;

    // Submission details boxes with better styling
    const boxHeight = 70;
    const boxWidth = 80;

    // Submitted By box with shadow effect
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(20, boxY, boxWidth, boxHeight, 2, 2, 'F');
    doc.setDrawColor(0);
    doc.roundedRect(20, boxY, boxWidth, boxHeight, 2, 2, 'S');
    
    // Add a subtle shadow effect
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(21, boxY + 1, boxWidth, boxHeight, 2, 2, 'F');

    // Submitted By content
    doc.setFont("times", "bold");
    doc.text('Submitted By:', 25, boxY + 10);
    
    // Name with bold label
    doc.text('Name:', 25, boxY + 20);
    doc.setFont("times", "normal");
    doc.text(coverDetails.studentName, 60, boxY + 20);
    
    // ID with bold label
    doc.setFont("times", "bold");
    doc.text('ID No:', 25, boxY + 30);
    doc.setFont("times", "normal");
    doc.text(coverDetails.studentId, 60, boxY + 30);
    
    // Intake with bold label
    doc.setFont("times", "bold");
    doc.text('Intake:', 25, boxY + 40);
    doc.setFont("times", "normal");
    doc.text(coverDetails.intake, 60, boxY + 40);
    
    // Section with bold label
    doc.setFont("times", "bold");
    doc.text('Section:', 25, boxY + 50);
    doc.setFont("times", "normal");
    doc.text(coverDetails.section, 60, boxY + 50);
    
    // Program with bold label
    doc.setFont("times", "bold");
    doc.text('Program:', 25, boxY + 60);
    doc.setFont("times", "normal");
    doc.text(coverDetails.program, 60, boxY + 60);

    // Submitted To box with similar styling
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(pageWidth - 100, boxY, boxWidth, boxHeight, 2, 2, 'F');
    doc.setDrawColor(0);
    doc.roundedRect(pageWidth - 100, boxY, boxWidth, boxHeight, 2, 2, 'S');
    
    // Add shadow effect
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(pageWidth - 99, boxY + 1, boxWidth, boxHeight, 2, 2, 'F');

    // Submitted To content
    doc.setFont("times", "bold");
    doc.text('Submitted To:', pageWidth - 95, boxY + 10);
    
    // Name with bold label
    doc.text('Name:', pageWidth - 95, boxY + 20);
    doc.setFont("times", "normal");
    doc.text(coverDetails.instructorName, pageWidth - 60, boxY + 20);
    
    // Department with bold label
    doc.setFont("times", "bold");
    doc.text('Department of:', pageWidth - 95, boxY + 30);
    doc.setFont("times", "normal");
    doc.text(coverDetails.department, pageWidth - 95, boxY + 40);
    
    // University name
    doc.text('Bangladesh University of', pageWidth - 95, boxY + 50);
    doc.text('Business & Technology', pageWidth - 95, boxY + 60);

    // Submission date - simplified without box
    const dateY = boxY + boxHeight + 15;
    doc.setFont("times", "normal");
    doc.text(`Date of Submission: ${coverDetails.submissionDate}`, 20, dateY + 10);

    // Signature section with styled lines
    const signatureY = dateY + 30;
    
    // Student signature
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.5);
    doc.line(20, signatureY, 80, signatureY);
    
    // Add student signature if provided
    if (coverDetails.studentSignature) {
      doc.setFont("times", "italic");
      doc.setFontSize(16);
      doc.text(coverDetails.studentSignature, 50, signatureY - 5, {
        align: 'center',
        renderingMode: 'fill'
      });
    }
    
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.text('Student Signature', 20, signatureY + 5);
    
    // Teacher signature line only (no text)
    doc.line(pageWidth - 80, signatureY, pageWidth - 20, signatureY);
    doc.text('Teacher Signature', pageWidth - 80, signatureY + 5);

    // Make sure we're not returning anything that might interfere with the save
    return doc;
  } catch (error) {
    console.error("Error in PDF generation:", error);
    throw error;
  }
}

// Make sure we're exporting correctly
export default generateCoverPDF;