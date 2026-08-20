import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def generate_pdf(pdf_filename):
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#0f172a'),
        alignment=1, # Center
        spaceAfter=6
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#475569'),
        alignment=1,
        spaceAfter=15
    )
    
    section_heading = ParagraphStyle(
        'SecHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#0f766e'),
        spaceBefore=10,
        spaceAfter=6
    )
    
    desc_style = ParagraphStyle(
        'SecDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#334155'),
        spaceAfter=8
    )
    
    story = []
    
    # Header Banner
    story.append(Paragraph("CHAROTAR UNIVERSITY OF SCIENCE AND TECHNOLOGY", title_style))
    story.append(Paragraph("Faculty of Technology and Engineering — CSPIT-IT<br/><b>ITUE301 — Advanced Web Development Frameworks</b><br/>Open-Book Practical Examination — SET A", subtitle_style))
    
    # Student & Exam Info Table
    info_data = [
        [Paragraph("<b>Student Roll No:</b> 24CSE001-A", desc_style), Paragraph("<b>Tech Stack:</b> React + Express + MongoDB", desc_style)],
        [Paragraph("<b>System Name:</b> MedCare Plus Hospital System", desc_style), Paragraph("<b>Date:</b> August 20, 2026", desc_style)]
    ]
    t = Table(info_data, colWidths=[270, 270])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f1f5f9')),
        ('PADDING', (0,0), (-1,-1), 8),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t)
    story.append(Spacer(1, 15))
    
    # ----------------------------------------------------
    # SCREENSHOT 1 SECTION
    # ----------------------------------------------------
    story.append(Paragraph("Screenshot 1 — React Application", section_heading))
    story.append(Paragraph("Demonstrates the Hospital Appointment System running in the browser (React frontend on <code>http://localhost:5173</code>), featuring navigation, dashboard stats, and status-styled appointment cards.", desc_style))
    
    img_path1 = os.path.abspath("report_screenshots/screenshot1_react.png")
    if os.path.exists(img_path1):
        story.append(Image(img_path1, width=540, height=280))
    story.append(Spacer(1, 15))
    
    # Page break for clean formatting
    story.append(PageBreak())
    
    # ----------------------------------------------------
    # SCREENSHOT 2 SECTION
    # ----------------------------------------------------
    story.append(Paragraph("Screenshot 2 — REST API Execution", section_heading))
    story.append(Paragraph("Demonstrates a successful REST API request to the Express backend (<code>GET http://localhost:5000/api/v1/doctors</code>) with a <code>200 OK</code> status code and structured JSON output.", desc_style))
    
    img_path2 = os.path.abspath("report_screenshots/screenshot2_rest_api.png")
    if os.path.exists(img_path2):
        story.append(Image(img_path2, width=540, height=280))
    story.append(Spacer(1, 15))
    
    # ----------------------------------------------------
    # SCREENSHOT 3 SECTION
    # ----------------------------------------------------
    story.append(Paragraph("Screenshot 3 — MongoDB Compass Database & Documents", section_heading))
    story.append(Paragraph("Demonstrates MongoDB Compass displaying the <code>hospital_system</code> database, the <code>appointments</code> collection, and document schema validations.", desc_style))
    
    img_path3 = os.path.abspath("report_screenshots/screenshot3_mongodb.png")
    if os.path.exists(img_path3):
        story.append(Image(img_path3, width=540, height=280))
        
    doc.build(story)
    print(f"Generated PDF Report successfully: {pdf_filename}")

if __name__ == "__main__":
    generate_pdf("24CSE001_SetA_Report.pdf")
    generate_pdf("SetA_Report.pdf")
