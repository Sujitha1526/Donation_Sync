import PDFDocument from 'pdfkit';
import User from '../models/User.js';

export const generateCertificate = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=certificate-${user.name}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // Add content to PDF
    doc.fontSize(24).text('Certificate of Appreciation', { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(16).text('Connect-Give Platform', { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(14).text(`This certificate is awarded to:`, { align: 'center' });
    doc.moveDown();

    doc.fontSize(18).font('Helvetica-Bold').text(user.name, { align: 'center' });
    doc.moveDown();

    doc.font('Helvetica').fontSize(14).text(`For your outstanding contributions as a ${user.role}`, { align: 'center' });
    doc.moveDown();

    doc.text(`Current Level: ${user.level}`, { align: 'center' });
    doc.moveDown();

    doc.text(`Donations Made: ${user.donationCount}`, { align: 'center' });
    doc.text(`Contributions Made: ${user.contributionCount}`, { align: 'center' });
    doc.moveDown(2);

    doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(12).text('Thank you for making a difference in our community!', { align: 'center' });

    // Finalize PDF
    doc.end();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};