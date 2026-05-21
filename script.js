// ============================
//  CAMPUS DATA
// ============================
const CAMPUS_DATA = [
  {
    id: "kijang",
    name: "Kijang Campus - BINUS University",
    address:
      "Jl. Kemanggisan Ilir III No. 45, Kemanggisan, Palmerah,\nJakarta Barat 11480,\nJakarta Raya Indonesia",
  },
  {
    id: "anggrek",
    name: "BINUS Kampus Anggrek",
    address:
      "Jl. Kebon Jeruk Raya No. 27,\nKebon Jeruk, Jakarta Barat 11530,\nIndonesia",
  },
  {
    id: "serpong",
    name: "BINUS SCHOOL Serpong",
    address:
      "Jl. Lengkong Karya – Jelupang No. 58,\nLengkong Karya, Kec. Serpong Utara,\nKota Tangerang Selatan, Banten 15322",
  },
];

// ============================
//  TEMPLATE CONFIGURATION
// ============================
const TEMPLATES = {
  "binus-univ": {
    name: "BINUS University",
    prefix: "BU",
    dir: "BINUS University",
    primaryColor: "#00529C",
    textColor: "#4c4d4e",
    websiteUrl: "www.binus.ac.id",
    websiteMb: 5,
    websiteMr: 90,
    nameMarginLeft: 31,
    nameMarginTop: 23,
    logoWidth: 98,
    logoHeight: 70,
    logoMarginTop: 0,
    logoMarginLeft: 10,
    col1Width: 108,
  },
  "binus-school": {
    name: "BINUS School",
    prefix: "BS",
    dir: "BINUS School",
    primaryColor: "#67102e",
    textColor: "#4c4d4e",
    websiteUrl: "www.binus.sch.id",
    websiteMb: 7,
    websiteMr: 85,
    nameMarginLeft: 31,
    nameMarginTop: 23,
    logoWidth: 67,
    logoHeight: 55,
    logoMarginTop: 0,
    logoMarginLeft: 13,
    col1Width: 80,
  },
  "bina-nusantara": {
    name: "BINA NUSANTARA",
    prefix: "BN",
    dir: "BINA NUSANTARA",
    primaryColor: "#6b2a7f",
    textColor: "#4c4d4e",
    websiteUrl: "www.binus.edu",
    websiteMb: 6,
    websiteMr: 98,
    nameMarginLeft: 23,
    nameMarginTop: 23,
    logoWidth: 130,
    logoHeight: "auto",
    logoMarginTop: 0,
    logoMarginLeft: 8,
    col1Width: 138,
  },
};

// ============================
//  SIZE DIMENSIONS MAP
// ============================
const SIZE_CONFIG = {
  600: {
    total: 600,
    height: 103,
    logoLeftTd: 130,
    divider: 1,
    logoRightTd: 100,
    nameFontSize: "6.5pt",
    textFontSize: "5.3pt",
  },
};

let currentSize = 600;

// ============================
//  POPULATE ALAMAT DROPDOWN
// ============================
function populateCampusDropdown() {
  const campusSelect = document.getElementById("inputCampus");

  // Reset
  campusSelect.innerHTML = '<option value="">-- Pilih Lokasi --</option>';
  CAMPUS_DATA.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.name;
    campusSelect.appendChild(opt);
  });

  // Reset preview
  document.getElementById("addressPreview").classList.remove("show");
  document.getElementById("addressPreview").textContent = "";
}

function getSelectedCampus() {
  const campusId = document.getElementById("inputCampus").value;
  return CAMPUS_DATA.find((c) => c.id === campusId) || null;
}

function onCampusChange() {
  const campus = getSelectedCampus();
  const preview = document.getElementById("addressPreview");
  if (campus) {
    preview.innerHTML =
      "<strong>" +
      campus.name +
      "</strong><br>" +
      campus.address.replace(/\n/g, "<br>");
    preview.classList.add("show");
  } else {
    preview.classList.remove("show");
    preview.textContent = "";
  }
  renderSignature();
}

// ============================
//  UNIFIED CONFIG CHANGE
// ============================
function onConfigChange() {
  // If template changed, re-populate campus dropdown
  populateCampusDropdown();
  renderSignature();
}

// ============================
//  RENDER SIGNATURE
// ============================
function renderSignature() {
  const templateId = document.getElementById("inputTemplate").value;
  if (!templateId) {
    document.getElementById("signature-preview").innerHTML =
      '<div style="padding:20px; text-align:center; color:#94a3b8; border:1px dashed #cbd5e1; border-radius:8px;">Silakan pilih template terlebih dahulu.</div>';
    return;
  }

  const tpl = TEMPLATES[templateId];
  const sz = SIZE_CONFIG[currentSize];

  const name =
    document.getElementById("inputName").value || "Nama Lengkap Anda";
  const title = document.getElementById("inputTitle").value || "Jabatan Anda";
  const phone = document.getElementById("inputPhone").value || "+62 21 ...";
  const mobile =
    document.getElementById("inputMobile").value || "+62 (8xx) xxxxxx";
  const email =
    document.getElementById("inputEmail").value || "email@binus.edu";

  const campusName =
    campusSelect.options[campusSelect.selectedIndex]?.text !==
    "-- Pilih Lokasi --"
      ? campusSelect.options[campusSelect.selectedIndex]?.text
      : "Nama Lokasi";
  const campusAddr =
    document.getElementById("addressPreview").innerHTML || "Detail Alamat";

  // Build Image Paths with Absolute URLs for Outlook compatibility
  // Uses the current URL context (e.g. http://127.0.0.1:8080/)
  let baseUrl = window.location.href;
  baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf("/") + 1);

  const baseDir = `Asset Image/${tpl.dir}`;
  const logoLeftUrl =
    baseUrl + encodeURI(`${baseDir}/${tpl.prefix}_${sz.total} logo.png`);
  const logoRightUrl = baseUrl + encodeURI(`${baseDir}/logo 45.png`);
  const supergraphicUrl =
    baseUrl +
    encodeURI(`${baseDir}/${tpl.prefix}_${sz.total} supergraphic.png`);
  const iconPhoneUrl =
    baseUrl + encodeURI(`${baseDir}/${tpl.prefix}_icon telephone.png`);
  const iconMobileUrl =
    baseUrl + encodeURI(`${baseDir}/${tpl.prefix}_icon phone.png`);
  const iconEmailUrl =
    baseUrl + encodeURI(`${baseDir}/${tpl.prefix}_icon mail.png`);

  // Icon builder — uses images provided
  const iconSz = currentSize >= 600 ? 12 : 9;
  function renderIcon(url) {
    return `<img src="${url}" width="${iconSz}" height="${iconSz}" style="display:inline-block; vertical-align:middle; margin-right:4px; border:none; outline:none; width:${iconSz}px; height:${iconSz}px;">`;
  }

  const iconPhone = renderIcon(iconPhoneUrl);
  const iconMailUrl =
    baseUrl + encodeURI(`${baseDir}/${tpl.prefix}_icon mail.png`);

  const html = `
  <table cellpadding="0" cellspacing="0" border="0" width="${sz.total}" height="103" style="width:${sz.total}px; max-width:${sz.total}px; height:103px; max-height:103px; background-color:#ffffff; border-collapse:collapse; border:1px solid #d1d5db; position:relative; overflow:hidden; font-family:Interstate,Arial,sans-serif; color:${tpl.textColor}; mso-table-lspace:0pt; mso-table-rspace:0pt;">
      <tr>
          <!-- Col 1: Left Logo -->
          <td width="${tpl.col1Width}" rowspan="2" valign="top" align="left" style="width:${tpl.col1Width}px; padding-top:${tpl.logoMarginTop}px; padding-left:${tpl.logoMarginLeft}px;">
              <img src="${logoLeftUrl}" alt="${tpl.name} Logo" style="display:block; border:none; outline:none; width:${tpl.logoWidth}px; max-width:${tpl.logoWidth}px; height:${typeof tpl.logoHeight === "number" ? tpl.logoHeight + "px" : tpl.logoHeight};">
          </td>
          
          <!-- Col 2: Center Content -->
          <td width="${sz.total - tpl.col1Width - 73}" valign="top" align="left" style="width:${sz.total - tpl.col1Width - 73}px; padding-top:${tpl.nameMarginTop}px; padding-left:${tpl.nameMarginLeft}px;">
              <!-- Nama -->
              <div style="font-family:Interstate,Arial,sans-serif; font-size:6.5pt; font-weight:bold; color:${tpl.primaryColor}; line-height:1.2; margin:0; padding:0; mso-line-height-rule:exactly;">${name}</div>
              
              <!-- Department: margin left 1 (139-138), margin top 2 from nama -->
              <div style="font-family:Interstate,Arial,sans-serif; font-size:5.5pt; color:${tpl.textColor}; line-height:1.2; margin-top:2px; padding:0; margin-left:1px; mso-line-height-rule:exactly;">${title}</div>
              
              <!-- Kontak & Alamat Nested Table -->
              <!-- mt-9 from department to reach exactly Y=50 -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-top:9px; margin-left:1px; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
                  <tr>
                      <!-- Phone numbers (mt-11 from department -> mt-9 on table + 2px padding here) -->
                      <td valign="top" style="padding-top:2px; padding-right:0px;">
                          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                              <tr>
                                  <td valign="middle" style="padding-bottom:3px;"><img src="${iconPhoneUrl}" width="8" style="display:block; border:none; max-width:8px;"></td>
                                  <td valign="middle" style="padding-bottom:3px; padding-left:4px; font-family:Interstate,Arial,sans-serif; font-size:5.3pt; color:${tpl.textColor}; line-height:1; mso-line-height-rule:exactly;">${phone}</td>
                              </tr>
                              <tr>
                                  <td valign="middle" style="padding-bottom:3px;"><img src="${iconMobileUrl}" width="8" style="display:block; border:none; max-width:8px;"></td>
                                  <td valign="middle" style="padding-bottom:3px; padding-left:4px; font-family:Interstate,Arial,sans-serif; font-size:5.3pt; color:${tpl.textColor}; line-height:1; mso-line-height-rule:exactly;">${mobile}</td>
                              </tr>
                              <tr>
                                  <td valign="middle"><img src="${iconEmailUrl}" width="8" style="display:block; border:none; max-width:8px;"></td>
                                  <td valign="middle" style="padding-left:4px; font-family:Interstate,Arial,sans-serif; font-size:5.3pt; color:${tpl.textColor}; line-height:1; mso-line-height-rule:exactly;">${email}</td>
                              </tr>
                          </table>
                      </td>
                      
                      <!-- Divider: margin left 11 from nomor telepon margin right 6 -->
                      <td valign="top" style="padding-left:11px; padding-right:6px;">
                          <div style="width:1px; height:32px; background-color:#cccccc; font-size:1px; line-height:1px;">&nbsp;</div>
                      </td>
                      
                      <!-- Alamat: perfectly aligned with top of phone numbers, mt-7 from department -->
                      <td valign="top" style="padding-top:0px; font-family:Interstate,Arial,sans-serif; font-size:5.3pt; color:${tpl.textColor}; line-height:1.2; mso-line-height-rule:exactly;">
                          <div style="font-weight:bold; color:${tpl.textColor}; margin-bottom:1px;">${campusName}</div>
                          <div>${campusAddr}</div>
                      </td>
                  </tr>
              </table>
          </td>
  
          <!-- Col 3: 45 Years Logo -->
          <td width="73" valign="top" align="right" style="width:73px; padding-top:15px; padding-right:23px;">
              <img src="${logoRightUrl}" alt="45 Years BINUS" style="display:block; border:none; outline:none; width:50px; height:45px; max-width:50px;">
          </td>
      </tr>
      <tr>
          <!-- Row 2: Supergraphic spanning Col 2 & 3 -->
          <td colspan="2" valign="bottom" align="right" height="20" style="height:20px; padding:0;">
              <table cellpadding="0" cellspacing="0" border="0" width="200" style="width:200px; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
                  <tr>
                      <td valign="bottom" align="right" width="200" height="20" style="width:200px; height:20px; background-image:url('${supergraphicUrl}'); background-repeat:no-repeat; background-size:100% 100%; background-position:right bottom;">
                          <!--[if gte mso 9]>
                          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:200px;height:20px;">
                          <v:fill type="frame" src="${supergraphicUrl}" />
                          <v:textbox inset="0,0,0,0">
                          <![endif]-->
                          <div style="padding-right:${tpl.websiteMr}px; padding-bottom:${tpl.websiteMb}px; line-height:1;">
                              <a href="https://${tpl.websiteUrl}" target="_blank" style="font-family:Interstate,Arial,sans-serif; font-size:5.5pt; font-weight:bold; color:#ffffff; text-decoration:none; mso-line-height-rule:exactly;">${tpl.websiteUrl}</a>
                          </div>
                          <!--[if gte mso 9]>
                          </v:textbox>
                          </v:rect>
                          <![endif]-->
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>`;

  document.getElementById("signature-preview").innerHTML = html;
}

// ============================
//  COPY TO CLIPBOARD
// ============================
function copySignature() {
  const signatureTable = document.querySelector("#signature-preview table");
  const range = document.createRange();
  range.selectNode(signatureTable);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  try {
    document.execCommand("copy");
    showToast();
  } catch (err) {
    alert("Gagal menyalin. Silakan seleksi manual dan copy.");
  }
  window.getSelection().removeAllRanges();
}

function showToast() {
  const t = document.getElementById("toast");
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

// ============================
//  INIT
// ============================
populateCampusDropdown();
renderSignature();
