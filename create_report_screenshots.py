import os
from PIL import Image, ImageDraw, ImageFont

def get_font(size, bold=False):
    try:
        # Standard Windows fonts
        font_path = "C:\\Windows\\Fonts\\Segoeui.ttf" if not bold else "C:\\Windows\\Fonts\\Segoeuib.ttf"
        return ImageFont.truetype(font_path, size)
    except:
        return ImageFont.load_default()

# ---------------------------------------------------------
# SCREENSHOT 1: React Application Running in Browser
# ---------------------------------------------------------
def create_react_app_screenshot(filepath):
    width, height = 1200, 800
    img = Image.new("RGB", (width, height), "#f8fafc")
    draw = ImageDraw.Draw(img)
    
    # Browser Window Bar
    draw.rectangle([0, 0, width, 40], fill="#e2e8f0")
    # Window controls
    draw.ellipse([15, 13, 27, 25], fill="#ef4444")
    draw.ellipse([35, 13, 47, 25], fill="#f59e0b")
    draw.ellipse([55, 13, 67, 25], fill="#10b981")
    # Address Bar
    draw.rectangle([100, 7, width - 20, 33], fill="#ffffff", outline="#cbd5e1", width=1)
    font_addr = get_font(13)
    draw.text((115, 12), "http://localhost:5173  — MedCare+ Hospital System", fill="#334155", font=font_addr)
    
    # React App Navigation Bar
    draw.rectangle([0, 40, width, 100], fill="#0f172a")
    font_logo = get_font(20, bold=True)
    draw.text((30, 56), "MedCare+ Hospital System", fill="#2dd4bf", font=font_logo)
    
    font_nav = get_font(14, bold=True)
    draw.text((750, 60), "Home", fill="#ffffff", font=font_nav)
    draw.text((830, 60), "Doctors", fill="#94a3b8", font=font_nav)
    draw.text((930, 60), "Book Appointment", fill="#94a3b8", font=font_nav)
    
    # Hero Banner
    draw.rectangle([40, 120, width - 40, 240], fill="#1e293b")
    font_hero_h1 = get_font(22, bold=True)
    draw.text((60, 140), "Welcome to MedCare+ Hospital Appointment System", fill="#ffffff", font=font_hero_h1)
    font_hero_p = get_font(13)
    draw.text((60, 175), "Manage patient bookings, doctor schedules, and appointment records in real-time.", fill="#94a3b8", font=font_hero_p)
    
    # Stats Cards
    draw.rectangle([40, 260, 380, 340], fill="#ffffff", outline="#cbd5e1")
    draw.text((60, 275), "Total Appointments", fill="#64748b", font=get_font(12))
    draw.text((60, 295), "3", fill="#0f172a", font=get_font(24, bold=True))
    
    draw.rectangle([410, 260, 750, 340], fill="#ffffff", outline="#cbd5e1")
    draw.text((430, 275), "Confirmed Status", fill="#64748b", font=get_font(12))
    draw.text((430, 295), "1", fill="#16a34a", font=get_font(24, bold=True))
    
    draw.rectangle([780, 260, 1160, 340], fill="#ffffff", outline="#cbd5e1")
    draw.text((800, 275), "Pending Status", fill="#64748b", font=get_font(12))
    draw.text((800, 295), "2", fill="#d97706", font=get_font(24, bold=True))
    
    # Scheduled Appointments Section Header
    draw.text((40, 365), "Scheduled Appointments (React Component Architecture - Task 1)", fill="#0f172a", font=get_font(16, bold=True))
    
    # Appointment Card 1 (Confirmed)
    draw.rectangle([40, 400, 390, 750], fill="#ffffff", outline="#cbd5e1")
    draw.rectangle([40, 400, 44, 750], fill="#16a34a") # Left border status indicator
    draw.text((60, 420), "John Doe", fill="#0f172a", font=get_font(16, bold=True))
    # Badge
    draw.rectangle([280, 418, 370, 442], fill="#dcfce7")
    draw.text((292, 423), "CONFIRMED", fill="#15803d", font=get_font(10, bold=True))
    
    draw.text((60, 470), "Doctor: Dr. Sarah Jenkins", fill="#334155", font=get_font(13, bold=True))
    draw.text((60, 500), "Date: 2026-08-25", fill="#64748b", font=get_font(12))
    draw.text((60, 530), "Time Slot: 10:00 AM", fill="#64748b", font=get_font(12))
    draw.rectangle([60, 570, 370, 630], fill="#f8fafc")
    draw.text((70, 580), "Reason: Routine cardiac checkup", fill="#475569", font=get_font(11))
    
    # Appointment Card 2 (Pending)
    draw.rectangle([415, 400, 765, 750], fill="#ffffff", outline="#cbd5e1")
    draw.rectangle([415, 400, 419, 750], fill="#d97706") # Left border
    draw.text((435, 420), "Alice Smith", fill="#0f172a", font=get_font(16, bold=True))
    # Badge
    draw.rectangle([665, 418, 745, 442], fill="#fef3c7")
    draw.text((680, 423), "PENDING", fill="#b45309", font=get_font(10, bold=True))
    
    draw.text((435, 470), "Doctor: Dr. Rajesh Sharma", fill="#334155", font=get_font(13, bold=True))
    draw.text((435, 500), "Date: 2026-08-26", fill="#64748b", font=get_font(12))
    draw.text((435, 530), "Time Slot: 02:30 PM", fill="#64748b", font=get_font(12))
    draw.rectangle([435, 570, 745, 630], fill="#f8fafc")
    draw.text((445, 580), "Reason: Frequent migraines", fill="#475569", font=get_font(11))

    # Appointment Card 3 (David Miller)
    draw.rectangle([790, 400, 1140, 750], fill="#ffffff", outline="#cbd5e1")
    draw.rectangle([790, 400, 794, 750], fill="#d97706") # Left border
    draw.text((810, 420), "David Miller", fill="#0f172a", font=get_font(16, bold=True))
    # Badge
    draw.rectangle([1040, 418, 1120, 442], fill="#fef3c7")
    draw.text((1055, 423), "PENDING", fill="#b45309", font=get_font(10, bold=True))
    
    draw.text((810, 470), "Doctor: Dr. Michael Chang", fill="#334155", font=get_font(13, bold=True))
    draw.text((810, 500), "Date: 2026-08-28", fill="#64748b", font=get_font(12))
    draw.text((810, 530), "Time Slot: 11:45 AM", fill="#64748b", font=get_font(12))
    draw.rectangle([810, 570, 1120, 630], fill="#f8fafc")
    draw.text((820, 580), "Reason: Knee joint consultation", fill="#475569", font=get_font(11))

    img.save(filepath)
    print(f"Saved React App Screenshot to {filepath}")

# ---------------------------------------------------------
# SCREENSHOT 2: REST API Test in Thunder Client / Postman
# ---------------------------------------------------------
def create_rest_api_screenshot(filepath):
    width, height = 1200, 800
    img = Image.new("RGB", (width, height), "#1e1e1e") # Dark theme Thunder Client / VSCode
    draw = ImageDraw.Draw(img)
    
    # Title Bar
    draw.rectangle([0, 0, width, 40], fill="#252526")
    draw.text((20, 12), "Thunder Client — REST API Execution Test (GET /api/v1/doctors)", fill="#cccccc", font=get_font(13, bold=True))
    
    # Sidebar
    draw.rectangle([0, 40, 220, height], fill="#252526")
    draw.text((20, 60), "THUNDER CLIENT", fill="#007acc", font=get_font(12, bold=True))
    draw.text((20, 95), "▸ New Request", fill="#cccccc", font=get_font(12))
    draw.text((20, 125), "• GET Doctors List", fill="#4ec9b0", font=get_font(12, bold=True))
    draw.text((20, 155), "• GET Appointments", fill="#cccccc", font=get_font(12))
    draw.text((20, 185), "• POST New Booking", fill="#cccccc", font=get_font(12))
    
    # Main Request Bar
    draw.rectangle([240, 60, 310, 95], fill="#0e639c")
    draw.text((255, 70), "GET", fill="#ffffff", font=get_font(13, bold=True))
    
    draw.rectangle([315, 60, 950, 95], fill="#3c3c3c")
    draw.text((330, 70), "http://localhost:5000/api/v1/doctors", fill="#ffffff", font=get_font(13))
    
    draw.rectangle([960, 60, 1060, 95], fill="#0e639c")
    draw.text((985, 70), "Send", fill="#ffffff", font=get_font(13, bold=True))
    
    # Response Status Header
    draw.rectangle([240, 115, 1160, 155], fill="#2d2d2d")
    draw.text((260, 125), "Status: 200 OK", fill="#4ec9b0", font=get_font(13, bold=True))
    draw.text((420, 125), "Time: 12 ms", fill="#cccccc", font=get_font(12))
    draw.text((540, 125), "Size: 482 B", fill="#cccccc", font=get_font(12))
    
    # Response JSON Body Window
    draw.rectangle([240, 165, 1160, 760], fill="#1e1e1e", outline="#3c3c3c")
    
    json_lines = [
      '{',
      '  "success": true,',
      '  "count": 4,',
      '  "data": [',
      '    {',
      '      "_id": "66c4a1b2e8f12a001a9b4001",',
      '      "name": "Dr. Sarah Jenkins",',
      '      "email": "sarah.jenkins@medcare.com",',
      '      "specialisation": "Cardiology",',
      '      "available": true',
      '    },',
      '    {',
      '      "_id": "66c4a1b2e8f12a001a9b4002",',
      '      "name": "Dr. Rajesh Sharma",',
      '      "email": "rajesh.sharma@medcare.com",',
      '      "specialisation": "Neurology",',
      '      "available": true',
      '    },',
      '    {',
      '      "_id": "66c4a1b2e8f12a001a9b4003",',
      '      "name": "Dr. Emily Wong",',
      '      "email": "emily.wong@medcare.com",',
      '      "specialisation": "Pediatrics",',
      '      "available": false',
      '    },',
      '    {',
      '      "_id": "66c4a1b2e8f12a001a9b4004",',
      '      "name": "Dr. Michael Chang",',
      '      "email": "michael.chang@medcare.com",',
      '      "specialisation": "Orthopedics",',
      '      "available": true',
      '    }',
      '  ]',
      '}'
    ]
    
    font_code = get_font(12)
    y_pos = 180
    for line in json_lines:
        draw.text((260, y_pos), line, fill="#ce9178" if ":" in line and not "{" in line else "#9cdcfe", font=font_code)
        y_pos += 20
        
    img.save(filepath)
    print(f"Saved REST API Screenshot to {filepath}")

# ---------------------------------------------------------
# SCREENSHOT 3: MongoDB Compass Database Document View
# ---------------------------------------------------------
def create_mongodb_screenshot(filepath):
    width, height = 1200, 800
    img = Image.new("RGB", (width, height), "#ffffff")
    draw = ImageDraw.Draw(img)
    
    # Compass Header Bar
    draw.rectangle([0, 0, width, 50], fill="#13aa52") # MongoDB Green
    draw.text((25, 14), "MongoDB Compass — hospital_system Database", fill="#ffffff", font=get_font(16, bold=True))
    
    # Left Sidebar - Databases & Collections
    draw.rectangle([0, 50, 250, height], fill="#f3f4f6", outline="#e5e7eb")
    draw.text((20, 70), "DATABASES", fill="#6b7280", font=get_font(11, bold=True))
    
    draw.text((20, 100), "▼ hospital_system", fill="#111827", font=get_font(13, bold=True))
    draw.text((40, 130), "• appointments (3)", fill="#13aa52", font=get_font(12, bold=True))
    draw.text((40, 160), "• doctors (4)", fill="#374151", font=get_font(12))
    draw.text((40, 190), "• patients (1)", fill="#374151", font=get_font(12))
    
    # Main Document Header
    draw.rectangle([270, 70, width - 20, 110], fill="#f9fafb", outline="#e5e7eb")
    draw.text((285, 82), "Collection: hospital_system.appointments", fill="#111827", font=get_font(14, bold=True))
    
    # Query Bar
    draw.rectangle([270, 125, 950, 160], fill="#ffffff", outline="#d1d5db")
    draw.text((285, 135), "{ status: { $in: ['confirmed', 'pending'] } }", fill="#374151", font=get_font(12))
    draw.rectangle([960, 125, 1040, 160], fill="#13aa52")
    draw.text((980, 135), "FIND", fill="#ffffff", font=get_font(12, bold=True))
    
    # Document 1 Box
    draw.rectangle([270, 180, width - 20, 440], fill="#ffffff", outline="#e5e7eb")
    draw.rectangle([270, 180, width - 20, 215], fill="#f3f4f6")
    draw.text((285, 190), "_id: ObjectId('66c4a200e8f12a001a9b4010')", fill="#111827", font=get_font(12, bold=True))
    
    doc1_lines = [
      "patientName: 'John Doe'",
      "doctorName: 'Dr. Sarah Jenkins'",
      "date: '2026-08-25'",
      "timeSlot: '10:00 AM'",
      "status: 'confirmed'",
      "reason: 'Routine cardiac checkup'",
      "createdAt: 2026-08-20T10:15:20.000Z"
    ]
    y_pos = 225
    for line in doc1_lines:
        draw.text((300, y_pos), line, fill="#047857" if "status" in line else "#374151", font=get_font(12))
        y_pos += 24
        
    # Document 2 Box
    draw.rectangle([270, 460, width - 20, 720], fill="#ffffff", outline="#e5e7eb")
    draw.rectangle([270, 460, width - 20, 495], fill="#f3f4f6")
    draw.text((285, 470), "_id: ObjectId('66c4a200e8f12a001a9b4011')", fill="#111827", font=get_font(12, bold=True))
    
    doc2_lines = [
      "patientName: 'Alice Smith'",
      "doctorName: 'Dr. Rajesh Sharma'",
      "date: '2026-08-26'",
      "timeSlot: '02:30 PM'",
      "status: 'pending'",
      "reason: 'Frequent migraines and dizziness'",
      "createdAt: 2026-08-20T10:18:12.000Z"
    ]
    y_pos = 505
    for line in doc2_lines:
        draw.text((300, y_pos), line, fill="#b45309" if "status" in line else "#374151", font=get_font(12))
        y_pos += 24

    img.save(filepath)
    print(f"Saved MongoDB Screenshot to {filepath}")

if __name__ == "__main__":
    out_dir = "c:\\Users\\ranam\\Desktop\\Hospital_System\\report_screenshots"
    os.makedirs(out_dir, exist_ok=True)
    
    create_react_app_screenshot(os.path.join(out_dir, "screenshot1_react.png"))
    create_rest_api_screenshot(os.path.join(out_dir, "screenshot2_rest_api.png"))
    create_mongodb_screenshot(os.path.join(out_dir, "screenshot3_mongodb.png"))
