const base_url = "http://127.0.0.1:8000";
// const base_url = "https://carbon-bloom.onrender.com";

function validate_data(data, formID) {
    let form = document.getElementById(formID);

    for (let i = 0; i < data.length; i++) {
        let field = form.elements[data[i]];

        if (!field) continue;

        if (field.hasAttribute('required') && !field.value.trim()) {
            swal("Data Missing!", "Please fill all required fields.", "warning");
            field.focus();
            return false;
        }
    }

    return true;
}

const defaultConfig = {
    background_color: "#f0f9f4",
    header_color: "#22c55e",
    text_color: "#1f2937",
    button_color: "#16a34a",
    footer_color: "#dcfce7",
    font_family: "system-ui, -apple-system, sans-serif",
    font_size: 16,
    header_title: "Farmer Registration Portal",
    page_title: "Register New Farmer",
    submit_button_text: "Register Farmer",
    terms_title: "Terms and Conditions",
    footer_text: "© 2024 Farmer Registration Portal. All rights reserved."
};

let config = {};
let currentRecordCount = 0;
let uploadedImages = {
    aadhar_front: null,
    aadhar_back: null,
    profile_picture: null
};

const dataHandler = {
    onDataChanged(data) {
        currentRecordCount = data.length;
    }
};

async function onConfigChange(newConfig) {
    const customFont = newConfig.font_family || defaultConfig.font_family;
    const baseFontStack = 'system-ui, -apple-system, sans-serif';
    const baseSize = newConfig.font_size || defaultConfig.font_size;

    const backgroundColor = newConfig.background_color || defaultConfig.background_color;
    const headerColor = newConfig.header_color || defaultConfig.header_color;
    const textColor = newConfig.text_color || defaultConfig.text_color;
    const buttonColor = newConfig.button_color || defaultConfig.button_color;
    const footerColor = newConfig.footer_color || defaultConfig.footer_color;

    document.body.style.background = backgroundColor;
    document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;
    document.body.style.fontSize = `${baseSize}px`;
    document.body.style.color = textColor;

    const header = document.getElementById('header');
    header.style.background = headerColor;
    header.style.color = '#ffffff';

    const headerTitle = document.getElementById('header-title');
    headerTitle.textContent = newConfig.header_title || defaultConfig.header_title;
    headerTitle.style.fontSize = `${baseSize * 1.875}px`;
    headerTitle.style.fontFamily = `${customFont}, ${baseFontStack}`;

    const pageTitle = document.getElementById('page-title');
    pageTitle.textContent = newConfig.page_title || defaultConfig.page_title;
    pageTitle.style.fontSize = `${baseSize * 1.5}px`;
    pageTitle.style.fontFamily = `${customFont}, ${baseFontStack}`;
    pageTitle.style.color = textColor;

    const termsTitle = document.getElementById('terms-title');
    termsTitle.textContent = newConfig.terms_title || defaultConfig.terms_title;
    termsTitle.style.color = textColor;
    termsTitle.style.fontFamily = `${customFont}, ${baseFontStack}`;

    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
        label.style.color = textColor;
        label.style.fontSize = `${baseSize * 0.875}px`;
        label.style.fontFamily = `${customFont}, ${baseFontStack}`;
    });

    const inputs = document.querySelectorAll('input:not([type="file"]):not([type="checkbox"]), textarea');
    inputs.forEach(input => {
        input.style.borderColor = headerColor;
        input.style.fontFamily = `${customFont}, ${baseFontStack}`;
        input.style.fontSize = `${baseSize}px`;
        input.style.color = textColor;
    });

    const fileLabels = document.querySelectorAll('.file-input-label');
    fileLabels.forEach(label => {
        label.style.background = buttonColor;
        label.style.fontFamily = `${customFont}, ${baseFontStack}`;
    });

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.style.background = buttonColor;
    submitBtn.style.color = '#ffffff';
    submitBtn.style.fontFamily = `${customFont}, ${baseFontStack}`;
    submitBtn.style.fontSize = `${baseSize * 1.125}px`;

    const submitText = document.getElementById('submit-text');
    submitText.textContent = newConfig.submit_button_text || defaultConfig.submit_button_text;

    const successMessage = document.getElementById('success-message');
    successMessage.style.background = footerColor;
    successMessage.style.color = textColor;
    successMessage.style.fontFamily = `${customFont}, ${baseFontStack}`;
    successMessage.style.fontSize = `${baseSize}px`;

    const footer = document.getElementById('footer');
    footer.style.background = footerColor;

    const footerText = document.getElementById('footer-text');
    footerText.textContent = newConfig.footer_text || defaultConfig.footer_text;
    footerText.style.color = textColor;
    footerText.style.fontSize = `${baseSize * 0.875}px`;
    footerText.style.fontFamily = `${customFont}, ${baseFontStack}`;
}

const element = {
    defaultConfig,
    onConfigChange,
    mapToCapabilities: (config) => ({
        recolorables: [
            {
                get: () => config.background_color || defaultConfig.background_color,
                set: (value) => {
                    config.background_color = value;
                    window.elementSdk.setConfig({ background_color: value });
                }
            },
            {
                get: () => config.header_color || defaultConfig.header_color,
                set: (value) => {
                    config.header_color = value;
                    window.elementSdk.setConfig({ header_color: value });
                }
            },
            {
                get: () => config.text_color || defaultConfig.text_color,
                set: (value) => {
                    config.text_color = value;
                    window.elementSdk.setConfig({ text_color: value });
                }
            },
            {
                get: () => config.button_color || defaultConfig.button_color,
                set: (value) => {
                    config.button_color = value;
                    window.elementSdk.setConfig({ button_color: value });
                }
            },
            {
                get: () => config.footer_color || defaultConfig.footer_color,
                set: (value) => {
                    config.footer_color = value;
                    window.elementSdk.setConfig({ footer_color: value });
                }
            }
        ],
        borderables: [],
        fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => {
                config.font_family = value;
                window.elementSdk.setConfig({ font_family: value });
            }
        },
        fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => {
                config.font_size = value;
                window.elementSdk.setConfig({ font_size: value });
            }
        }
    }),
    mapToEditPanelValues: (config) => new Map([
        ["header_title", config.header_title || defaultConfig.header_title],
        ["page_title", config.page_title || defaultConfig.page_title],
        ["submit_button_text", config.submit_button_text || defaultConfig.submit_button_text],
        ["terms_title", config.terms_title || defaultConfig.terms_title],
        ["footer_text", config.footer_text || defaultConfig.footer_text]
    ])
};

function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const toggleIcon = document.getElementById(`${fieldId}-toggle-icon`);

    if (field.type === 'password') {
        field.type = 'text';
        toggleIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                `;
    } else {
        field.type = 'password';
        toggleIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                `;
    }
}

function validatePassword(password) {
    return {
        length: password.length >= 8 && password.length <= 10,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
}

function updatePasswordValidation() {
    const password = document.getElementById('password').value;
    const validation = validatePassword(password);

    document.getElementById('val-length').className = `validation-bullet ${validation.length ? 'valid' : password.length > 0 ? 'invalid' : ''}`;
    document.getElementById('val-uppercase').className = `validation-bullet ${validation.uppercase ? 'valid' : password.length > 0 ? 'invalid' : ''}`;
    document.getElementById('val-lowercase').className = `validation-bullet ${validation.lowercase ? 'valid' : password.length > 0 ? 'invalid' : ''}`;
    document.getElementById('val-number').className = `validation-bullet ${validation.number ? 'valid' : password.length > 0 ? 'invalid' : ''}`;
    document.getElementById('val-special').className = `validation-bullet ${validation.special ? 'valid' : password.length > 0 ? 'invalid' : ''}`;

    checkPasswordMatch();
}

function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const container = document.getElementById('password-match-container');

    if (confirmPassword.length === 0) {
        container.innerHTML = '';
        return;
    }

    if (password === confirmPassword) {
        container.innerHTML = '<div class="password-match-message match">✓ Passwords match</div>';
    } else {
        container.innerHTML = '<div class="password-match-message no-match">✗ Passwords do not match</div>';
    }
}

function handleImageUpload(inputId) {
    const input = document.getElementById(inputId);
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImages[inputId] = e.target.result;

            const previewId = `${inputId}_preview`;
            const imgId = `${inputId}_img`;

            document.getElementById(previewId).classList.remove('hidden');
            document.getElementById(imgId).src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function deleteImage(inputId) {
    uploadedImages[inputId] = null;
    document.getElementById(inputId).value = '';
    document.getElementById(`${inputId}_preview`).classList.add('hidden');
    document.getElementById(`${inputId}_img`).src = '';
}

async function initializeApp() {
    if (window.elementSdk) {
        window.elementSdk.init(element);
        config = window.elementSdk.config;
        await onConfigChange(config);
    }

    if (window.dataSdk) {
        const initResult = await window.dataSdk.init(dataHandler);
        if (!initResult.isOk) {
            console.error("Failed to initialize data SDK");
        }
    }

    const form = document.getElementById('register_farmer');
    form.addEventListener('submit', handleFormSubmit);

    document.getElementById('password').addEventListener('input', updatePasswordValidation);
    document.getElementById('confirm_password').addEventListener('input', checkPasswordMatch);

    document.getElementById('aadhar_front').addEventListener('change', () => handleImageUpload('aadhar_front'));
    document.getElementById('aadhar_back').addEventListener('change', () => handleImageUpload('aadhar_back'));
    document.getElementById('profile_picture').addEventListener('change', () => handleImageUpload('profile_picture'));
}

async function handleFormSubmit(e) {
    e.preventDefault();

    if (currentRecordCount >= 999) {
        showMessage("Maximum limit of 999 registrations reached. Please contact administrator.", true);
        return;
    }

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const validation = validatePassword(password);

    if (!validation.length || !validation.uppercase || !validation.lowercase || !validation.number || !validation.special) {
        showMessage("Password does not meet all requirements. Please check the validation bullets.", true);
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Passwords do not match. Please check and try again.", true);
        return;
    }

    if (!uploadedImages.aadhar_front || !uploadedImages.aadhar_back || !uploadedImages.profile_picture) {
        showMessage("Please upload all required images.", true);
        return;
    }

    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const originalText = submitText.textContent;

    submitBtn.disabled = true;
    submitText.textContent = 'Registering...';

    let form_data = new FormData(document.getElementById('register_farmer'));

    $.ajax({
        url: base_url+'/farmer_register/',
        type: 'POST',
        data: form_data,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.status === 'success') {
                swal({
                    title: "Success!",
                    text: "Farmer registered successfully!",
                    icon: "success",
                    button: "OK",
                }).then(() => {
                    // window.location.reload();
                    window.location.href = base_url + 'farmer_dashboard/';
                    // showMessage("Farmer Created.", true);
                });
                
                $('#register_farmer')[0].reset();
            } else {
                alert('Error registering farmer: ' + response.message);
            }
        },
        error: function (xhr, status, error) {
            alert('Error registering farmer: ' + error);
        }
    });

    submitBtn.disabled = false;
    submitText.textContent = originalText;

    return false;

}

function showMessage(message, isError) {
    const successMessage = document.getElementById('success-message');
    const successText = document.getElementById('success-text');

    successText.textContent = message;
    successMessage.classList.remove('hidden');

    if (isError) {
        successMessage.style.background = '#fee2e2';
    } else {
        successMessage.style.background = config.footer_color || defaultConfig.footer_color;
    }

    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 5000);
}

const districts = {

    "Andaman and Nicobar Islands": [
        "Nicobar",
        "North and Middle Andaman",
        "South Andaman"
    ],

    "Andhra Pradesh": [
        "Alluri Sitarama Raju",
        "Anakapalli",
        "Anantapur",
        "Annamayya",
        "Bapatla",
        "Chittoor",
        "East Godavari",
        "Eluru",
        "Guntur",
        "Kakinada",
        "Konaseema",
        "Krishna",
        "Kurnool",
        "Manyam",
        "Nandyal",
        "Nellore",
        "Palnadu",
        "Prakasam",
        "Srikakulam",
        "Tirupati",
        "Visakhapatnam",
        "Vizianagaram",
        "West Godavari",
        "YSR Kadapa"
    ],

    "Arunachal Pradesh": [
        "Anjaw",
        "Changlang",
        "Dibang Valley",
        "East Kameng",
        "East Siang",
        "Itanagar Capital Complex",
        "Kamle",
        "Kra Daadi",
        "Kurung Kumey",
        "Lepa Rada",
        "Lohit",
        "Longding",
        "Lower Dibang Valley",
        "Lower Siang",
        "Lower Subansiri",
        "Namsai",
        "Pakke-Kessang",
        "Papum Pare",
        "Shi Yomi",
        "Siang",
        "Tawang",
        "Tirap",
        "Upper Dibang Valley",
        "Upper Siang",
        "Upper Subansiri",
        "West Kameng",
        "West Siang"
    ],

    "Assam": [
        "Baksa",
        "Barpeta",
        "Biswanath",
        "Bongaigaon",
        "Cachar",
        "Charaideo",
        "Chirang",
        "Darrang",
        "Dhemaji",
        "Dhubri",
        "Dibrugarh",
        "Dima Hasao",
        "Goalpara",
        "Golaghat",
        "Hailakandi",
        "Hojai",
        "Jorhat",
        "Kamrup",
        "Kamrup Metropolitan",
        "Karbi Anglong",
        "Karimganj",
        "Kokrajhar",
        "Lakhimpur",
        "Majuli",
        "Morigaon",
        "Nagaon",
        "Nalbari",
        "Sivasagar",
        "Sonitpur",
        "South Salmara-Mankachar",
        "Tinsukia",
        "Udalguri",
        "West Karbi Anglong"
    ],

    "Bihar": [
        "Araria",
        "Arwal",
        "Aurangabad",
        "Banka",
        "Begusarai",
        "Bhagalpur",
        "Bhojpur",
        "Buxar",
        "Darbhanga",
        "East Champaran",
        "Gaya",
        "Gopalganj",
        "Jamui",
        "Jehanabad",
        "Kaimur",
        "Katihar",
        "Khagaria",
        "Kishanganj",
        "Lakhisarai",
        "Madhepura",
        "Madhubani",
        "Munger",
        "Muzaffarpur",
        "Nalanda",
        "Nawada",
        "Patna",
        "Purnia",
        "Rohtas",
        "Saharsa",
        "Samastipur",
        "Saran",
        "Sheikhpura",
        "Sheohar",
        "Sitamarhi",
        "Siwan",
        "Supaul",
        "Vaishali",
        "West Champaran"
    ],

    "Chhattisgarh": [
        "Balod",
        "Baloda Bazar",
        "Balrampur",
        "Bastar",
        "Bemetara",
        "Bijapur",
        "Bilaspur",
        "Dantewada",
        "Dhamtari",
        "Durg",
        "Gariaband",
        "Gaurela-Pendra-Marwahi",
        "Janjgir-Champa",
        "Jashpur",
        "Kabirdham",
        "Kanker",
        "Kondagaon",
        "Korba",
        "Koriya",
        "Mahasamund",
        "Mungeli",
        "Narayanpur",
        "Raigarh",
        "Raipur",
        "Rajnandgaon",
        "Sukma",
        "Surajpur",
        "Surguja"
    ],

    "Goa": [
        "North Goa",
        "South Goa"
    ],

    "Gujarat": [
        "Ahmedabad",
        "Amreli",
        "Anand",
        "Aravalli",
        "Banaskantha",
        "Bharuch",
        "Bhavnagar",
        "Botad",
        "Chhota Udaipur",
        "Dahod",
        "Dang",
        "Devbhoomi Dwarka",
        "Gandhinagar",
        "Gir Somnath",
        "Jamnagar",
        "Junagadh",
        "Kheda",
        "Kutch",
        "Mahisagar",
        "Mehsana",
        "Morbi",
        "Narmada",
        "Navsari",
        "Panchmahal",
        "Patan",
        "Porbandar",
        "Rajkot",
        "Sabarkantha",
        "Surat",
        "Surendranagar",
        "Tapi",
        "Vadodara",
        "Valsad"
    ],

    "Haryana": [
        "Ambala",
        "Bhiwani",
        "Charkhi Dadri",
        "Faridabad",
        "Fatehabad",
        "Gurugram",
        "Hisar",
        "Jhajjar",
        "Jind",
        "Kaithal",
        "Karnal",
        "Kurukshetra",
        "Mahendragarh",
        "Nuh",
        "Palwal",
        "Panchkula",
        "Panipat",
        "Rewari",
        "Rohtak",
        "Sirsa",
        "Sonipat",
        "Yamunanagar"
    ],

    "Himachal Pradesh": [
        "Bilaspur",
        "Chamba",
        "Hamirpur",
        "Kangra",
        "Kinnaur",
        "Kullu",
        "Lahaul and Spiti",
        "Mandi",
        "Shimla",
        "Sirmaur",
        "Solan",
        "Una"
    ],

    "Jharkhand": [
        "Bokaro",
        "Chatra",
        "Deoghar",
        "Dhanbad",
        "Dumka",
        "East Singhbhum",
        "Garhwa",
        "Giridih",
        "Godda",
        "Gumla",
        "Hazaribagh",
        "Jamtara",
        "Khunti",
        "Koderma",
        "Latehar",
        "Lohardaga",
        "Pakur",
        "Palamu",
        "Ramgarh",
        "Ranchi",
        "Sahebganj",
        "Seraikela Kharsawan",
        "Simdega",
        "West Singhbhum"
    ],

    "Karnataka": [
        "Bagalkot",
        "Ballari",
        "Belagavi",
        "Bengaluru Rural",
        "Bengaluru Urban",
        "Bidar",
        "Chamarajanagar",
        "Chikkaballapur",
        "Chikkamagaluru",
        "Chitradurga",
        "Dakshina Kannada",
        "Davanagere",
        "Dharwad",
        "Gadag",
        "Hassan",
        "Haveri",
        "Kalaburagi",
        "Kodagu",
        "Kolar",
        "Koppal",
        "Mandya",
        "Mysuru",
        "Raichur",
        "Ramanagara",
        "Shivamogga",
        "Tumakuru",
        "Udupi",
        "Uttara Kannada",
        "Vijayapura",
        "Yadgir"
    ],

    "Kerala": [
        "Alappuzha",
        "Ernakulam",
        "Idukki",
        "Kannur",
        "Kasaragod",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Wayanad"
    ],

    "Madhya Pradesh": [
        "Agar Malwa",
        "Alirajpur",
        "Anuppur",
        "Ashoknagar",
        "Balaghat",
        "Barwani",
        "Betul",
        "Bhind",
        "Bhopal",
        "Burhanpur",
        "Chhatarpur",
        "Chhindwara",
        "Damoh",
        "Datia",
        "Dewas",
        "Dhar",
        "Dindori",
        "Guna",
        "Gwalior",
        "Harda",
        "Hoshangabad",
        "Indore",
        "Jabalpur",
        "Jhabua",
        "Katni",
        "Khandwa",
        "Khargone",
        "Mandla",
        "Mandsaur",
        "Morena",
        "Narsinghpur",
        "Neemuch",
        "Panna",
        "Raisen",
        "Rajgarh",
        "Ratlam",
        "Rewa",
        "Sagar",
        "Satna",
        "Sehore",
        "Seoni",
        "Shahdol",
        "Shajapur",
        "Sheopur",
        "Shivpuri",
        "Sidhi",
        "Singrauli",
        "Tikamgarh",
        "Ujjain",
        "Umaria",
        "Vidisha"
    ],

    "Maharashtra": [
        "Ahmednagar",
        "Akola",
        "Amravati",
        "Aurangabad",
        "Beed",
        "Bhandara",
        "Buldhana",
        "Chandrapur",
        "Dhule",
        "Gadchiroli",
        "Gondia",
        "Hingoli",
        "Jalgaon",
        "Jalna",
        "Kolhapur",
        "Latur",
        "Mumbai City",
        "Mumbai Suburban",
        "Nagpur",
        "Nanded",
        "Nandurbar",
        "Nashik",
        "Osmanabad",
        "Palghar",
        "Parbhani",
        "Pune",
        "Raigad",
        "Ratnagiri",
        "Sangli",
        "Satara",
        "Sindhudurg",
        "Solapur",
        "Thane",
        "Wardha",
        "Washim",
        "Yavatmal"
    ],

    "Manipur": [
        "Bishnupur",
        "Chandel",
        "Churachandpur",
        "Imphal East",
        "Imphal West",
        "Jiribam",
        "Kakching",
        "Kamjong",
        "Kangpokpi",
        "Noney",
        "Pherzawl",
        "Senapati",
        "Tamenglong",
        "Tengnoupal",
        "Thoubal",
        "Ukhrul"
    ],

    "Meghalaya": [
        "East Garo Hills",
        "East Jaintia Hills",
        "East Khasi Hills",
        "North Garo Hills",
        "Ri Bhoi",
        "South Garo Hills",
        "South West Garo Hills",
        "South West Khasi Hills",
        "West Garo Hills",
        "West Jaintia Hills",
        "West Khasi Hills"
    ],

    "Mizoram": [
        "Aizawl",
        "Champhai",
        "Kolasib",
        "Lawngtlai",
        "Lunglei",
        "Mamit",
        "Saiha",
        "Serchhip"
    ],

    "Nagaland": [
        "Dimapur",
        "Kiphire",
        "Kohima",
        "Longleng",
        "Mokokchung",
        "Mon",
        "Peren",
        "Phek",
        "Tuensang",
        "Wokha",
        "Zunheboto"
    ],

    "Odisha": [
        "Angul",
        "Balangir",
        "Balasore",
        "Bargarh",
        "Bhadrak",
        "Boudh",
        "Cuttack",
        "Deogarh",
        "Dhenkanal",
        "Gajapati",
        "Ganjam",
        "Jagatsinghpur",
        "Jajpur",
        "Jharsuguda",
        "Kalahandi",
        "Kandhamal",
        "Kendrapara",
        "Kendujhar",
        "Khordha",
        "Koraput",
        "Malkangiri",
        "Mayurbhanj",
        "Nabarangpur",
        "Nuapada",
        "Puri",
        "Rayagada",
        "Sambalpur",
        "Sonepur",
        "Sundergarh"
    ],

    "Punjab": [
        "Amritsar",
        "Barnala",
        "Bathinda",
        "Faridkot",
        "Fatehgarh Sahib",
        "Fazilka",
        "Firozpur",
        "Gurdaspur",
        "Hoshiarpur",
        "Jalandhar",
        "Kapurthala",
        "Ludhiana",
        "Malerkotla",
        "Mansa",
        "Moga",
        "Muktsar",
        "Pathankot",
        "Patiala",
        "Rupnagar",
        "Sangrur",
        "Shahid Bhagat Singh Nagar",
        "Tarn Taran"
    ],

    "Rajasthan": [
        "Ajmer",
        "Alwar",
        "Banswara",
        "Baran",
        "Barmer",
        "Bharatpur",
        "Bhilwara",
        "Bikaner",
        "Bundi",
        "Chittorgarh",
        "Churu",
        "Dausa",
        "Dholpur",
        "Dungarpur",
        "Hanumangarh",
        "Jaipur",
        "Jaisalmer",
        "Jalore",
        "Jhalawar",
        "Jhunjhunu",
        "Jodhpur",
        "Karauli",
        "Kota",
        "Nagaur",
        "Pali",
        "Pratapgarh",
        "Rajsamand",
        "Sawai Madhopur",
        "Sikar",
        "Sirohi",
        "Tonk",
        "Udaipur"
    ],

    "Sikkim": [
        "East Sikkim",
        "North Sikkim",
        "South Sikkim",
        "West Sikkim"
    ],

    "Tamil Nadu": [
        "Ariyalur",
        "Chengalpattu",
        "Chennai",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kallakurichi",
        "Kancheepuram",
        "Karur",
        "Krishnagiri",
        "Madurai",
        "Nagapattinam",
        "Namakkal",
        "Nilgiris",
        "Perambalur",
        "Pudukkottai",
        "Ramanathapuram",
        "Ranipet",
        "Salem",
        "Sivaganga",
        "Tenkasi",
        "Thanjavur",
        "Theni",
        "Thoothukudi",
        "Tiruchirappalli",
        "Tirunelveli",
        "Tirupathur",
        "Tiruppur",
        "Tiruvallur",
        "Tiruvannamalai",
        "Tiruvarur",
        "Vellore",
        "Viluppuram",
        "Virudhunagar"
    ],

    "Telangana": [
        "Adilabad",
        "Bhadradri Kothagudem",
        "Hyderabad",
        "Jagtial",
        "Jangaon",
        "Jayashankar Bhupalpally",
        "Jogulamba Gadwal",
        "Kamareddy",
        "Karimnagar",
        "Khammam",
        "Komaram Bheem Asifabad",
        "Mahabubabad",
        "Mahabubnagar",
        "Mancherial",
        "Medak",
        "Medchal Malkajgiri",
        "Mulugu",
        "Nagarkurnool",
        "Nalgonda",
        "Narayanpet",
        "Nirmal",
        "Nizamabad",
        "Peddapalli",
        "Rajanna Sircilla",
        "Rangareddy",
        "Sangareddy",
        "Siddipet",
        "Suryapet",
        "Vikarabad",
        "Wanaparthy",
        "Warangal Rural",
        "Warangal Urban",
        "Yadadri Bhuvanagiri"
    ],

    "Tripura": [
        "Dhalai",
        "Gomati",
        "Khowai",
        "North Tripura",
        "Sepahijala",
        "South Tripura",
        "Unakoti",
        "West Tripura"
    ],

    "Uttar Pradesh": [
        "Agra",
        "Aligarh",
        "Ambedkar Nagar",
        "Amethi",
        "Amroha",
        "Auraiya",
        "Ayodhya",
        "Azamgarh",
        "Baghpat",
        "Bahraich",
        "Ballia",
        "Balrampur",
        "Banda",
        "Barabanki",
        "Bareilly",
        "Basti",
        "Bhadohi",
        "Bijnor",
        "Budaun",
        "Bulandshahr",
        "Chandauli",
        "Chitrakoot",
        "Deoria",
        "Etah",
        "Etawah",
        "Ayodhya",
        "Farrukhabad",
        "Fatehpur",
        "Firozabad",
        "Gautam Buddha Nagar",
        "Ghaziabad",
        "Ghazipur",
        "Gonda",
        "Gorakhpur",
        "Hamirpur",
        "Hapur",
        "Hardoi",
        "Hathras",
        "Jalaun",
        "Jaunpur",
        "Jhansi",
        "Kannauj",
        "Kanpur Dehat",
        "Kanpur Nagar",
        "Kasganj",
        "Kaushambi",
        "Kheri",
        "Kushinagar",
        "Lakhimpur Kheri",
        "Lalitpur",
        "Lucknow",
        "Maharajganj",
        "Mahoba",
        "Mainpuri",
        "Mathura",
        "Mau",
        "Meerut",
        "Mirzapur",
        "Moradabad",
        "Muzaffarnagar",
        "Pilibhit",
        "Pratapgarh",
        "Raebareli",
        "Rampur",
        "Saharanpur",
        "Sambhal",
        "Sant Kabir Nagar",
        "Shahjahanpur",
        "Shamli",
        "Shrawasti",
        "Siddharthnagar",
        "Sitapur",
        "Sonbhadra",
        "Sultanpur",
        "Unnao",
        "Varanasi"
    ],

    "Uttarakhand": [
        "Almora",
        "Bageshwar",
        "Chamoli",
        "Champawat",
        "Dehradun",
        "Haridwar",
        "Nainital",
        "Pauri Garhwal",
        "Pithoragarh",
        "Rudraprayag",
        "Tehri Garhwal",
        "Udham Singh Nagar",
        "Uttarkashi"
    ],

    "West Bengal": [
        "Alipurduar",
        "Bankura",
        "Birbhum",
        "Cooch Behar",
        "Dakshin Dinajpur",
        "Darjeeling",
        "Hooghly",
        "Howrah",
        "Jalpaiguri",
        "Jhargram",
        "Kalimpong",
        "Kolkata",
        "Malda",
        "Murshidabad",
        "Nadia",
        "North 24 Parganas",
        "Paschim Bardhaman",
        "Paschim Medinipur",
        "Purba Bardhaman",
        "Purba Medinipur",
        "Purulia",
        "South 24 Parganas",
        "Uttar Dinajpur"
    ],

    // Union Territories

    "Chandigarh": [
        "Chandigarh"
    ],

    "Dadra and Nagar Haveli and Daman and Diu": [
        "Dadra and Nagar Haveli",
        "Daman",
        "Diu"
    ],

    "Delhi": [
        "Central Delhi",
        "East Delhi",
        "New Delhi",
        "North Delhi",
        "North East Delhi",
        "North West Delhi",
        "Shahdara",
        "South Delhi",
        "South East Delhi",
        "South West Delhi",
        "West Delhi"
    ],

    "Jammu and Kashmir": [
        "Anantnag",
        "Bandipora",
        "Baramulla",
        "Budgam",
        "Doda",
        "Ganderbal",
        "Jammu",
        "Kathua",
        "Kishtwar",
        "Kulgam",
        "Kupwara",
        "Poonch",
        "Pulwama",
        "Rajouri",
        "Ramban",
        "Reasi",
        "Samba",
        "Shopian",
        "Srinagar",
        "Udhampur"
    ],

    "Ladakh": [
        "Kargil",
        "Leh"
    ],

    "Lakshadweep": [
        "Agatti",
        "Amini",
        "Andrott",
        "Bithra",
        "Chetlat",
        "Kavaratti",
        "Kadmat",
        "Kalpeni",
        "Minicoy"
    ],

    "Puducherry": [
        "Karaikal",
        "Mahe",
        "Puducherry",
        "Yanam"
    ]
};

function loadDistricts() {
    const state = document.getElementById('state').value;
    const districtSelect = document.getElementById('district');

    districtSelect.innerHTML = '<option value="" disabled selected>Select District</option>';

    if (districts[state]) {
        districts[state].forEach(dist => {
            const option = document.createElement('option');
            option.value = dist;
            option.textContent = dist;
            districtSelect.appendChild(option);
        });
    }
}
