import { jsPDF } from 'jspdf';

export const generateCoverPDF = (coverDetails) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

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

  // Assignment heading with decorative elements
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.text('Assignment', pageWidth / 2, 70, { align: 'center' });
  
  // Decorative lines around "Assignment"
  const assignmentWidth = doc.getTextWidth('Assignment');
  doc.setLineWidth(0.5);
  // Left decorative element
  doc.line(pageWidth / 2 - assignmentWidth / 2 - 20, 70, pageWidth / 2 - assignmentWidth / 2 - 5, 70);
  // Right decorative element
  doc.line(pageWidth / 2 + assignmentWidth / 2 + 5, 70, pageWidth / 2 + assignmentWidth / 2 + 20, 70);

  // Course details section with box
  doc.setDrawColor(0);
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(20, 85, pageWidth - 40, 35, 3, 3, 'F');
  doc.setFontSize(11);
  doc.text(`Course Title: ${coverDetails.courseTitle}`, 25, 95);
  doc.text(`Course Code: ${coverDetails.courseCode}`, 25, 105);
  doc.text(`Assignment No: ${coverDetails.assignmentNo}`, 25, 115);

  // Submission details boxes with better styling
  const boxY = 135;
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
  doc.setFont("times", "normal");
  doc.text(`Name: ${coverDetails.studentName}`, 25, boxY + 20);
  doc.text(`ID No: ${coverDetails.studentId}`, 25, boxY + 30);
  doc.text(`Intake: ${coverDetails.intake}`, 25, boxY + 40);
  doc.text(`Section: ${coverDetails.section}`, 25, boxY + 50);
  doc.text(`Program: ${coverDetails.program}`, 25, boxY + 60);

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
  doc.setFont("times", "normal");
  doc.text(`Name: ${coverDetails.instructorName}`, pageWidth - 95, boxY + 20);
  doc.text(`Department of:`, pageWidth - 95, boxY + 30);
  doc.text(`${coverDetails.department}`, pageWidth - 95, boxY + 40);
  doc.text('Bangladesh University of', pageWidth - 95, boxY + 50);
  doc.text('Business & Technology', pageWidth - 95, boxY + 60);

  // Submission date with styled box
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(20, boxY + boxHeight + 20, pageWidth - 40, 20, 2, 2, 'F');
  doc.setFont("times", "normal");
  doc.text(`Date of Submission: ${coverDetails.submissionDate}`, 25, boxY + boxHeight + 33);

  // Signature section with styled lines
  const signatureY = boxY + boxHeight + 60;
  
  // Student signature
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.5);
  doc.line(20, signatureY, 80, signatureY);
  doc.setFontSize(10);
  doc.text('Student Signature', 20, signatureY + 5);
  
  // Teacher signature
  doc.line(pageWidth - 80, signatureY, pageWidth - 20, signatureY);
  doc.text('Teacher Signature', pageWidth - 80, signatureY + 5);

  doc.save('assignment-cover.pdf');
}

export default generateCoverPDF;