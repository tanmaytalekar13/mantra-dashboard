import jsPDF from "jspdf";

export const downloadPDF = (
  title: string,
  content: string
) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(title, 20, 20);

  doc.setFontSize(11);

  const lines = doc.splitTextToSize(content, 170);

  doc.text(lines, 20, 35);

  doc.save(`${title}.pdf`);
};