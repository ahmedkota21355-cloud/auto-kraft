class AutoKraftPlatform {
  constructor() {
    this.initializeState();
    this.bindEvents();
    this.checkSession();
  }

  // --- STATE INITIALIZATION ---
  initializeState() {
    // Default initial data if localStorage is empty
    const defaultCustomers = [
      {
        id: "cust-1",
        name: "Ahmed Aly",
        email: "ahmed@example.com",
        phone: "01008875541",
        password: "password",
        points: 450,
        vehicles: [
          {
            brand: "BMW",
            model: "M3 Competition",
            year: "2022",
            vin: "WBA53AG05F7820815",
            plate: "ABC 1234",
            mileage: 48900
          }
        ]
      },
      {
        id: "cust-2",
        name: "Sherif Kamal",
        email: "sherif@example.com",
        phone: "01112233445",
        password: "password",
        points: 1200,
        vehicles: [
          {
            brand: "Porsche",
            model: "911 Carrera S",
            year: "2021",
            vin: "WPOZZZ99Z12345678",
            plate: "XYZ 9876",
            mileage: 28100
          }
        ]
      }
    ];

    const defaultHistory = [
      {
        vin: "WBA53AG05F7820815",
        date: "2025-05-15",
        mileage: 15200,
        branch: "Sheikh Zayed",
        tech: "Hassan Shaker (BMW M Certified)",
        details: "First routine maintenance service. Microfilter replaced, spark plugs checked. Engine oil and filter replaced with BMW Longlife-04 fluid.",
        parts: ["Engine Oil Filter", "BMW Longlife Oil", "Microfilter"],
        cost: 380,
        notes: "Engine running perfect. Brake pad wear at 15%."
      },
      {
        vin: "WBA53AG05F7820815",
        date: "2025-11-20",
        mileage: 32400,
        branch: "El-Lebini",
        tech: "Tarek Nour (BMW Specialist)",
        details: "Brake system overhaul. Replaced front brake pads and rotors. Bled brake lines and flushed system with DOT 4 fluid.",
        parts: ["Front Brake Pads", "Front Rotors", "Brake Fluid DOT 4"],
        cost: 840,
        notes: "Rear brake pads are at 40% life remaining."
      },
      {
        vin: "WBA53AG05F7820815",
        date: "2026-04-10",
        mileage: 45000,
        branch: "Full Up Ring Road",
        tech: "Omar Sherif (Porsche & BMW Tech)",
        details: "Routine maintenance and spark plug replacements. Cleaned air filters and performed ECU scans.",
        parts: ["Spark Plugs", "Air Filters", "Cabin Filter"],
        cost: 520,
        notes: "ECU scan shows no error codes. Ready for track day usage."
      },
      {
        vin: "WPOZZZ99Z12345678",
        date: "2025-09-12",
        mileage: 18000,
        branch: "Sheikh Zayed",
        tech: "Omar Sherif (Porsche Master Tech)",
        details: "PDK Transmission check and routine oil service. Spark plug cleaning and adaptive suspension calibrations.",
        parts: ["Mobil 1 0W-40 Oil", "Oil Filter Element", "PDK Clutch Fluid"],
        cost: 720,
        notes: "Calibration successful, gear shifts running under factory limits."
      }
    ];

    const defaultHealth = {
      "WBA53AG05F7820815": {
        engine: 95,
        transmission: 90,
        cooling: 75,
        radiator: 80,
        brakes: 70,
        battery: 40,
        suspension: 88,
        turbo: 92,
        ac: 85,
        tires: 65
      },
      "WPOZZZ99Z12345678": {
        engine: 98,
        transmission: 95,
        cooling: 90,
        radiator: 92,
        brakes: 85,
        battery: 80,
        suspension: 90,
        turbo: 95,
        ac: 90,
        tires: 75
      }
    };

    const defaultWorkOrders = [
      {
        id: "WO-9844",
        vin: "WBA53AG05F7820815",
        customerName: "Ahmed Aly",
        mileage: 48900,
        tech: "Hassan Shaker (BMW M Certified)",
        parts: ["Rear Brake Pads", "Brake Sensor"],
        cost: 280,
        status: "Under Repair",
        notes: "Customer complained of squeaking noise from rear brake pads. Replaced pads and wear sensors.",
        date: "2026-06-22"
      },
      {
        id: "WO-9512",
        vin: "WPOZZZ99Z12345678",
        customerName: "Sherif Kamal",
        mileage: 28100,
        tech: "Omar Sherif (Porsche Master Tech)",
        parts: ["Transmission fluid PDK", "Gear filter"],
        cost: 980,
        status: "Ready For Delivery",
        notes: "PDK transmission fluid leak check and clutch calibration.",
        date: "2026-06-15"
      }
    ];

    const defaultBookings = [
      {
        id: "BK-1002",
        customerName: "Ahmed Aly",
        customerId: "cust-1",
        vehicleVin: "WBA53AG05F7820815",
        vehicleName: "BMW M3 Competition",
        branch: "Sheikh Zayed",
        serviceType: "Routine Maintenance",
        date: "2026-06-25",
        timeSlot: "10:00 AM",
        notes: "Request wheel alignment check",
        status: "Approved"
      }
    ];

    const defaultInventory = [
      { code: "BMW-EOP-09", name: "Engine Oil Filter", category: "Filters", compatibility: "BMW M50/S55/S58", stock: 42, threshold: 10 },
      { code: "POR-PDK-44", name: "Porsche PDK Fluid", category: "Fluids", compatibility: "Porsche PDK 7-Speed", stock: 8, threshold: 5 },
      { code: "BMW-SBP-12", name: "M Performance Pads", category: "Braking", compatibility: "BMW F80/G80", stock: 3, threshold: 5 },
      { code: "MIN-ACF-02", name: "Cabin Carbon Filter", category: "Filters", compatibility: "MINI Cooper F56", stock: 18, threshold: 8 },
      { code: "SPK-NGK-99", name: "NGK Laser Spark Plugs", category: "Ignition", compatibility: "BMW/Porsche/MINI", stock: 85, threshold: 20 }
    ];

    const defaultTechnicians = [
      { name: "Hassan Shaker", specialty: "BMW M Performance Certified", branch: "El-Lebini", load: "WIP (1)", status: "Active" },
      { name: "Tarek Nour", specialty: "BMW Electrical & Coding", branch: "Sheikh Zayed", load: "WIP (0)", status: "Active" },
      { name: "Omar Sherif", specialty: "Porsche Master Technician", branch: "Sheikh Zayed", load: "WIP (1)", status: "Active" },
      { name: "Kareem Badawi", specialty: "MINI Cooper Specialist", branch: "Full Up Ring Road", load: "WIP (0)", status: "Active" }
    ];

    // Load from local storage or set defaults
    this.customers = JSON.parse(localStorage.getItem("autokraft_customers")) || defaultCustomers;
    this.history = JSON.parse(localStorage.getItem("autokraft_history")) || defaultHistory;
    this.health = JSON.parse(localStorage.getItem("autokraft_health")) || defaultHealth;
    this.workOrders = JSON.parse(localStorage.getItem("autokraft_work_orders")) || defaultWorkOrders;
    this.bookings = JSON.parse(localStorage.getItem("autokraft_bookings")) || defaultBookings;
    this.inventory = JSON.parse(localStorage.getItem("autokraft_inventory")) || defaultInventory;
    this.technicians = JSON.parse(localStorage.getItem("autokraft_technicians")) || defaultTechnicians;
    this.activeUser = JSON.parse(localStorage.getItem("autokraft_active_user")) || null;
    
    // Booking wizard state
    this.bookingState = {
      step: 1,
      branch: "",
      vehicle: null, // Holds vehicle object or "new"
      serviceType: "",
      description: "",
      date: "",
      timeSlot: ""
    };

    // Save in case we set defaults
    this.saveData();

    // Default messages log
    this.notifications = [
      { sender: "AUTOKRAFT", text: "Hello! Welcome to the AUTOKRAFT notifications channel. Real-time updates about your vehicle's bookings and repair stages will be logged here.", time: "01:40 AM" }
    ];
  }

  saveData() {
    localStorage.setItem("autokraft_customers", JSON.stringify(this.customers));
    localStorage.setItem("autokraft_history", JSON.stringify(this.history));
    localStorage.setItem("autokraft_health", JSON.stringify(this.health));
    localStorage.setItem("autokraft_work_orders", JSON.stringify(this.workOrders));
    localStorage.setItem("autokraft_bookings", JSON.stringify(this.bookings));
    localStorage.setItem("autokraft_inventory", JSON.stringify(this.inventory));
    localStorage.setItem("autokraft_technicians", JSON.stringify(this.technicians));
    localStorage.setItem("autokraft_active_user", JSON.stringify(this.activeUser));
  }

  // --- SESSION CHECK ---
  checkSession() {
    const authBtn = document.getElementById("nav-auth-btn");
    const navPortal = document.getElementById("nav-portal");
    
    if (this.activeUser) {
      authBtn.innerHTML = `Dashboard <i class="fa-solid fa-user-gear"></i>`;
      authBtn.onclick = () => this.navigate("portal");
      
      // Update portal profile info
      document.getElementById("portal-user-name").textContent = this.activeUser.name;
      document.getElementById("portal-avatar-letter").textContent = this.activeUser.name.charAt(0);
      
      // Update vehicle fields in booking step 2
      this.populateBookingVehicles();
    } else {
      authBtn.innerHTML = `Login / Register`;
      authBtn.onclick = () => this.navigate("auth");
    }
  }

  // --- BIND HTML EVENTS ---
  bindEvents() {
    // Brand showcases on click
    document.querySelectorAll(".brand-tab").forEach(tab => {
      tab.addEventListener("click", (e) => {
        this.changeShowcaseBrand(e.target.dataset.brand);
      });
    });

    // Handle clicks on branch selection cards in Booking Wizard
    document.querySelectorAll(".branch-select-card").forEach(card => {
      card.addEventListener("click", () => {
        const branch = card.dataset.branch;
        this.selectWizardBranch(branch);
      });
    });

    // Handle clicks on service items in Booking Wizard
    document.querySelectorAll(".service-select-item").forEach(item => {
      item.addEventListener("click", () => {
        const serviceName = item.dataset.service;
        this.selectWizardService(serviceName);
      });
    });

    // Set min date for datepicker (cannot book past dates)
    const today = new Date().toISOString().split("T")[0];
    const dateInput = document.getElementById("wiz-date");
    if(dateInput) dateInput.min = today;
  }

  // --- NAVIGATION ROUTER ---
  navigate(viewName) {
    // Remove active class from all views and nav items
    document.querySelectorAll(".view-pane").forEach(pane => pane.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));

    // Check if views need authorization
    if (viewName === "portal" && !this.activeUser) {
      this.navigate("auth");
      return;
    }

    const activeView = document.getElementById(`view-${viewName}`);
    if (activeView) {
      activeView.classList.add("active");
    }

    const activeNav = document.getElementById(`nav-${viewName}`);
    if (activeNav) {
      activeNav.classList.add("active");
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Handle page-specific initializations
    if (viewName === "portal") {
      this.renderPortal();
    } else if (viewName === "admin") {
      this.renderAdmin();
    } else if (viewName === "book") {
      this.initBookingWizard();
    }
  }

  scrollToSection(sectionId) {
    this.navigate("home");
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  }

  toggleMobileMenu() {
    const navLinks = document.querySelector(".nav-links");
    const navButtons = document.querySelector(".nav-buttons");
    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none";
      navButtons.style.display = "none";
    } else {
      navLinks.style.display = "flex";
      navLinks.style.flexDirection = "column";
      navLinks.style.width = "100%";
      navLinks.style.position = "absolute";
      navLinks.style.top = "70px";
      navLinks.style.left = "0";
      navLinks.style.background = "var(--bg-main)";
      navLinks.style.padding = "2rem";
      navLinks.style.gap = "1.5rem";
      
      navButtons.style.display = "flex";
      navButtons.style.flexDirection = "column";
      navButtons.style.width = "100%";
      navButtons.style.marginTop = "1rem";
    }
  }

  // --- SHOWCASE BRAND SWITCHER ---
  changeShowcaseBrand(brand) {
    document.querySelectorAll(".brand-tab").forEach(tab => tab.classList.remove("active"));
    const selectedTab = document.querySelector(`.brand-tab[data-brand="${brand}"]`);
    if (selectedTab) selectedTab.classList.add("active");

    const img = document.getElementById("hero-showcase-img");
    const model = document.getElementById("hero-car-model");
    const spec = document.getElementById("hero-car-spec");

    if (brand === "BMW") {
      model.textContent = "BMW M5 Competition";
      spec.textContent = "V8 Twin-Turbo Expert Service";
      // Let's use our local asset
      img.src = "assets/hero_bmw_m5.png";
    } else if (brand === "MINI") {
      model.textContent = "MINI Cooper S (JCW)";
      spec.textContent = "Turbocharged Performance Tuning";
      // Render simple outline drawing fallback or local placeholder
      img.src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop"; // Premium mini cooper placeholder
    } else if (brand === "Porsche") {
      model.textContent = "Porsche 911 Turbo S";
      spec.textContent = "Flat-6 Bi-Turbo Master Engineering";
      img.src = "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=600&auto=format&fit=crop"; // Premium Porsche placeholder
    }
  }

  // --- AUTH OPERATIONS (LOGIN/SIGNUP) ---
  toggleAuthMode(mode) {
    const loginForm = document.getElementById("form-login");
    const registerForm = document.getElementById("form-register");
    const titleText = document.getElementById("auth-title-text");
    const subtitleText = document.getElementById("auth-subtitle-text");
    
    document.querySelectorAll(".auth-toggle-btn").forEach(btn => btn.classList.remove("active"));
    
    if (mode === "login") {
      document.getElementById("btn-toggle-login").classList.add("active");
      loginForm.style.display = "flex";
      registerForm.style.display = "none";
      titleText.textContent = "CUSTOMER PORTAL";
      subtitleText.textContent = "Log in to track status and view vehicle health report";
    } else {
      document.getElementById("btn-toggle-register").classList.add("active");
      loginForm.style.display = "none";
      registerForm.style.display = "flex";
      titleText.textContent = "REGISTRATION";
      subtitleText.textContent = "Join AUTOKRAFT network and register your vehicle";
    }
  }

  handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-password").value;
    
    const customer = this.customers.find(c => c.email.toLowerCase() === email.toLowerCase() && c.password === pass);
    
    if (customer) {
      this.activeUser = customer;
      this.saveData();
      this.checkSession();
      this.navigate("portal");
      
      // Notify via simulator
      this.logWhatsAppNotification("System", `🔑 Customer logged in: Welcome back, ${customer.name}! Ready to access your digital history.`);
    } else {
      alert("Invalid email or password combination. Try using ahmed@example.com / password");
    }
  }

  handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById("reg-name").value;
    const phone = document.getElementById("reg-mobile").value;
    const email = document.getElementById("reg-email").value;
    const pass = document.getElementById("reg-password").value;
    
    const brand = document.getElementById("reg-car-brand").value;
    const model = document.getElementById("reg-car-model").value;
    const year = document.getElementById("reg-car-year").value;
    const vin = document.getElementById("reg-car-vin").value.toUpperCase();
    const plate = document.getElementById("reg-car-plate").value.toUpperCase();
    const mileage = parseInt(document.getElementById("reg-car-mileage").value) || 0;

    // Check duplicate VIN or email
    const exists = this.customers.some(c => c.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      alert("An account with this email already exists.");
      return;
    }

    const newCustomer = {
      id: `cust-${Date.now()}`,
      name,
      email,
      phone,
      password: pass,
      points: 100, // Welcome points
      vehicles: [
        { brand, model, year, vin, plate, mileage }
      ]
    };

    // Create default health stats for new vehicle
    this.health[vin] = {
      engine: 98,
      transmission: 96,
      cooling: 95,
      radiator: 98,
      brakes: 92,
      battery: 100,
      suspension: 98,
      turbo: 98,
      ac: 95,
      tires: 90
    };

    this.customers.push(newCustomer);
    this.activeUser = newCustomer;
    
    this.saveData();
    this.checkSession();
    this.navigate("portal");

    // Dynamic WhatsApp
    this.logWhatsAppNotification("AUTOKRAFT", `🏁 Welcome ${name} to AUTOKRAFT! Your ${brand} ${model} (VIN: ${vin}) has been successfully registered. You earned 100 Welcome Points!`);
  }

  logoutUser() {
    this.activeUser = null;
    this.saveData();
    this.checkSession();
    this.navigate("home");
  }

  // --- BOOKING WIZARD OPERATIONS ---
  initBookingWizard() {
    this.bookingState = {
      step: 1,
      branch: "",
      vehicle: null,
      serviceType: "",
      description: "",
      date: "",
      timeSlot: ""
    };
    this.goToWizardStep(1);
    
    // Clear dynamic forms
    document.getElementById("wiz-car-form").style.display = "none";
    document.getElementById("wiz-issue-desc").value = "";
    document.getElementById("wiz-date").value = "";
    document.getElementById("wiz-time-slots").innerHTML = "";

    // Clear selections visual
    document.querySelectorAll(".branch-select-card").forEach(c => c.classList.remove("selected"));
    document.querySelectorAll(".service-select-item").forEach(i => i.classList.remove("selected"));

    this.populateBookingVehicles();
  }

  populateBookingVehicles() {
    const listContainer = document.getElementById("wizard-logged-vehicles");
    if (!listContainer) return;
    
    listContainer.innerHTML = "";
    
    if (this.activeUser && this.activeUser.vehicles.length > 0) {
      this.activeUser.vehicles.forEach((car, index) => {
        const selectedClass = index === 0 ? "selected" : "";
        if (index === 0) this.bookingState.vehicle = car; // Default select first
        
        listContainer.innerHTML += `
          <div class="vehicle-select-card glass-card ${selectedClass}" onclick="app.selectWizardVehicle(this, '${car.vin}')">
            <div class="vehicle-select-meta">
              <span class="vehicle-select-name">${car.brand} ${car.model}</span>
              <span class="vehicle-select-vin">VIN: ${car.vin}</span>
            </div>
            <span class="vehicle-select-plate">${car.plate}</span>
          </div>
        `;
      });
      document.getElementById("wizard-guest-vehicle-trigger").style.display = "block";
    } else {
      listContainer.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem;">Please register a vehicle or enter details below.</p>`;
      this.showWizardCarForm();
      document.getElementById("wizard-guest-vehicle-trigger").style.display = "none";
    }
  }

  showWizardCarForm() {
    document.getElementById("wizard-car-form").style.display = "block";
    this.bookingState.vehicle = "new";
    
    // Deselect list cards
    document.querySelectorAll(".vehicle-select-card").forEach(c => c.classList.remove("selected"));
  }

  selectWizardVehicle(cardElement, vin) {
    document.querySelectorAll(".vehicle-select-card").forEach(c => c.classList.remove("selected"));
    cardElement.classList.add("selected");
    document.getElementById("wizard-car-form").style.display = "none";
    
    // Find car
    const carObj = this.activeUser.vehicles.find(c => c.vin === vin);
    this.bookingState.vehicle = carObj;
  }

  selectWizardBranch(branchName) {
    document.querySelectorAll(".branch-select-card").forEach(c => c.classList.remove("selected"));
    const card = document.querySelector(`.branch-select-card[data-branch="${branchName}"]`);
    if(card) card.classList.add("selected");
    
    this.bookingState.branch = branchName;
  }

  selectWizardService(serviceName) {
    document.querySelectorAll(".service-select-item").forEach(i => i.classList.remove("selected"));
    const item = document.querySelector(`.service-select-item[data-service="${serviceName}"]`);
    if(item) item.classList.add("selected");
    
    this.bookingState.serviceType = serviceName;
  }

  generateTimeSlots() {
    const slotsGrid = document.getElementById("wiz-time-slots");
    slotsGrid.innerHTML = "";
    
    const times = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM", "06:30 PM", "08:00 PM"];
    
    times.forEach(t => {
      // Mock disable some slots
      const isBooked = Math.random() < 0.25;
      const disabledClass = isBooked ? "disabled" : "";
      
      const el = document.createElement("div");
      el.className = `time-slot ${disabledClass}`;
      el.textContent = t;
      
      if (!isBooked) {
        el.onclick = () => {
          document.querySelectorAll(".time-slot").forEach(s => s.classList.remove("selected"));
          el.classList.add("selected");
          this.bookingState.timeSlot = t;
        };
      }
      
      slotsGrid.appendChild(el);
    });
  }

  goToWizardStep(stepNum) {
    // Hide all panes
    document.querySelectorAll(".wizard-pane").forEach(p => p.classList.remove("active"));
    
    // Show select pane
    const activePane = document.getElementById(`wizard-pane-${stepNum}`);
    if (activePane) activePane.classList.add("active");
    
    // Update step index line
    const progressLine = document.getElementById("wizard-progress-line");
    const percent = ((stepNum - 1) / 5) * 100;
    progressLine.style.width = `${percent}%`;
    
    // Update active circles
    for (let i = 1; i <= 6; i++) {
      const ind = document.getElementById(`step-ind-${i}`);
      if (i < stepNum) {
        ind.className = "step-indicator completed";
      } else if (i === stepNum) {
        ind.className = "step-indicator active";
      } else {
        ind.className = "step-indicator";
      }
    }
    
    this.bookingState.step = stepNum;

    // Show/Hide prev button
    const prevBtn = document.getElementById("wiz-prev-btn");
    prevBtn.style.visibility = stepNum === 1 ? "hidden" : "visible";

    // Edit next/confirm button wording
    const nextBtn = document.getElementById("wiz-next-btn");
    if (stepNum === 6) {
      nextBtn.innerHTML = `Confirm Booking <i class="fa-solid fa-check"></i>`;
      this.populateWizardSummary();
    } else {
      nextBtn.innerHTML = `Next <i class="fa-solid fa-arrow-right"></i>`;
    }
  }

  wizardNext() {
    const curStep = this.bookingState.step;
    
    // STEP 1 VALIDATION
    if (curStep === 1 && !this.bookingState.branch) {
      alert("Please select a branch to continue.");
      return;
    }
    
    // STEP 2 VALIDATION
    if (curStep === 2) {
      if (this.bookingState.vehicle === "new") {
        // Read input values
        const brand = document.getElementById("wiz-car-brand").value;
        const model = document.getElementById("wiz-car-model").value;
        const year = document.getElementById("wiz-car-year").value;
        const vin = document.getElementById("wiz-car-vin").value.toUpperCase();
        const plate = document.getElementById("wiz-car-plate").value.toUpperCase();
        const mileage = parseInt(document.getElementById("wiz-car-mileage").value) || 0;
        
        if (!brand || !model || !year || !vin || !plate) {
          alert("Please fill in all vehicle parameters.");
          return;
        }
        
        this.bookingState.vehicle = { brand, model, year, vin, plate, mileage, isTemporary: true };
      } else if (!this.bookingState.vehicle) {
        alert("Please select or enter vehicle details.");
        return;
      }
    }

    // STEP 3 VALIDATION
    if (curStep === 3 && !this.bookingState.serviceType) {
      alert("Please select a service type.");
      return;
    }

    // STEP 4 VALIDATION
    if (curStep === 4) {
      const desc = document.getElementById("wiz-issue-desc").value;
      if (!desc.trim()) {
        alert("Please describe the issue or check-up request.");
        return;
      }
      this.bookingState.description = desc;
    }

    // STEP 5 VALIDATION
    if (curStep === 5) {
      const date = document.getElementById("wiz-date").value;
      if (!date || !this.bookingState.timeSlot) {
        alert("Please choose both date and available time slot.");
        return;
      }
      this.bookingState.date = date;
    }

    // STEP 6: BOOKING FINALIZE
    if (curStep === 6) {
      this.finalizeBookingSubmit();
      return;
    }

    this.goToWizardStep(curStep + 1);
  }

  wizardPrev() {
    if (this.bookingState.step > 1) {
      this.goToWizardStep(this.bookingState.step - 1);
    }
  }

  populateWizardSummary() {
    const car = this.bookingState.vehicle;
    const carText = car.isTemporary ? `${car.brand} ${car.model} (Unregistered)` : `${car.brand} ${car.model}`;
    
    document.getElementById("conf-branch").textContent = this.bookingState.branch + " Branch";
    document.getElementById("conf-vehicle").textContent = `${carText} [VIN: ${car.vin}]`;
    document.getElementById("conf-service").textContent = this.bookingState.serviceType;
    document.getElementById("conf-schedule").textContent = `${this.bookingState.date} @ ${this.bookingState.timeSlot}`;
    document.getElementById("conf-notes").textContent = this.bookingState.description;
  }

  finalizeBookingSubmit() {
    // Generate Booking Obj
    const id = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const custName = this.activeUser ? this.activeUser.name : "Guest Customer";
    const custId = this.activeUser ? this.activeUser.id : "guest";
    
    const newBooking = {
      id,
      customerName: custName,
      customerId: custId,
      vehicleVin: this.bookingState.vehicle.vin,
      vehicleName: `${this.bookingState.vehicle.brand} ${this.bookingState.vehicle.model}`,
      branch: this.bookingState.branch,
      serviceType: this.bookingState.serviceType,
      date: this.bookingState.date,
      timeSlot: this.bookingState.timeSlot,
      notes: this.bookingState.description,
      status: "Pending Approval"
    };

    // If new car was entered, register it to user if logged in
    if (this.activeUser && this.bookingState.vehicle.isTemporary) {
      const dbCust = this.customers.find(c => c.id === this.activeUser.id);
      if (dbCust) {
        // Remove temporary flag
        delete this.bookingState.vehicle.isTemporary;
        dbCust.vehicles.push(this.bookingState.vehicle);
        this.activeUser = dbCust;
        
        // Add default health for this new car
        this.health[this.bookingState.vehicle.vin] = {
          engine: 95, transmission: 90, cooling: 85, radiator: 90, brakes: 80, battery: 95, suspension: 90, turbo: 92, ac: 88, tires: 80
        };
      }
    }

    this.bookings.push(newBooking);
    this.saveData();

    // Trigger Dynamic WhatsApp Confirm
    this.logWhatsAppNotification("AUTOKRAFT", `📅 Booking Received: Service: ${newBooking.serviceType} for ${newBooking.vehicleName} (VIN: ${newBooking.vehicleVin}) scheduled at ${newBooking.branch} on ${newBooking.date} at ${newBooking.timeSlot}. Status: Pending review.`);

    alert(`Service booking submitted successfully! Booking ID: ${id}. You can track progress in the customer portal.`);
    
    if (this.activeUser) {
      this.navigate("portal");
    } else {
      this.navigate("home");
    }
  }

  // --- CUSTOMER PORTAL RENDERING ---
  renderPortal() {
    if (!this.activeUser) return;
    
    // Fetch user's primary vehicle
    const vehicle = this.activeUser.vehicles[0]; // Get first car
    
    // Overview tab stats
    document.getElementById("stat-loyalty-pts").innerHTML = `${this.activeUser.points}<span>pts</span>`;
    document.getElementById("stat-mileage").innerHTML = `${vehicle.mileage.toLocaleString()}<span>km</span>`;
    
    // Next service calculation (mileage + 8000)
    const nextService = Math.ceil((vehicle.mileage + 1000) / 10000) * 10000;
    document.getElementById("stat-next-service").innerHTML = `${nextService.toLocaleString()}<span>km</span>`;

    // Render registered details
    document.getElementById("portal-car-brand").textContent = vehicle.brand;
    document.getElementById("portal-car-model").textContent = `${vehicle.brand} ${vehicle.model}`;
    document.getElementById("portal-car-vin").textContent = vehicle.vin;
    document.getElementById("portal-car-plate").textContent = vehicle.plate;
    document.getElementById("portal-car-year").textContent = vehicle.year;
    
    // Change image display based on brand
    const portalCarImage = document.getElementById("portal-car-image");
    if(vehicle.brand === "BMW") {
      portalCarImage.src = "assets/hero_bmw_m5.png";
    } else if(vehicle.brand === "MINI") {
      portalCarImage.src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop";
    } else {
      portalCarImage.src = "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=600&auto=format&fit=crop";
    }

    // Calculate total visits for this VIN
    const visits = this.history.filter(h => h.vin === vehicle.vin).length;
    document.getElementById("stat-visits").innerHTML = `${visits}<span>visits</span>`;

    // Live status tracker query
    const activeWorkOrder = this.workOrders.find(wo => wo.vin === vehicle.vin && wo.status !== "Delivered");
    const trackerWrapper = document.getElementById("portal-live-tracker-wrapper");
    
    if (activeWorkOrder) {
      trackerWrapper.style.display = "block";
      document.getElementById("portal-active-wo-num").textContent = activeWorkOrder.id;
      this.updateLiveStatusUI(activeWorkOrder.status);
    } else {
      trackerWrapper.style.display = "none";
    }

    // Render components health
    this.renderHealthReport(vehicle.vin);

    // Render history timeline
    this.renderHistoryTimeline(vehicle.vin);

    // Render loyalty system
    this.renderLoyaltyRewards();

    // Render documents
    this.renderPortalDocuments(vehicle.vin);
  }

  switchPortalPane(paneName) {
    document.querySelectorAll(".sidebar-nav-item").forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".dashboard-pane").forEach(pane => pane.classList.remove("active"));
    
    document.getElementById(`sb-${paneName}`).classList.add("active");
    document.getElementById(`portal-pane-${paneName}`).classList.add("active");
    
    // Re-draw canvases if entering health report
    if (paneName === "health") {
      const vehicle = this.activeUser.vehicles[0];
      this.renderHealthReport(vehicle.vin);
    }
  }

  updateLiveStatusUI(status) {
    const stages = ["Received", "Under Inspection", "Under Repair", "Waiting For Parts", "Quality Control", "Ready For Delivery"];
    const statusIdx = stages.indexOf(status);
    
    const progressLine = document.getElementById("live-progress-line");
    let percentage = 0;
    
    if (statusIdx >= 0) {
      percentage = (statusIdx / 5) * 100;
    }
    
    // Check if horizontal layout (desktop) or vertical layout (mobile)
    const isMobile = window.innerWidth <= 900;
    if (isMobile) {
      progressLine.style.width = "4px";
      progressLine.style.height = `${percentage}%`;
    } else {
      progressLine.style.height = "4px";
      progressLine.style.width = `${percentage}%`;
    }

    const ids = ["ts-received", "ts-inspect", "ts-repair", "ts-parts", "ts-qc", "ts-ready"];
    
    ids.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      
      if (idx < statusIdx) {
        el.className = "tracker-step completed";
      } else if (idx === statusIdx) {
        el.className = "tracker-step active";
      } else {
        el.className = "tracker-step";
      }
    });
  }

  // --- HEALTH REPORT TELEMETRY GENERATOR ---
  renderHealthReport(vin) {
    const grid = document.getElementById("portal-health-grid");
    if (!grid) return;
    
    grid.innerHTML = "";
    
    const vehicleHealth = this.health[vin] || {
      engine: 90, transmission: 90, cooling: 90, radiator: 90, brakes: 90, battery: 90, suspension: 90, turbo: 90, ac: 90, tires: 90
    };

    const components = [
      { name: "Engine", key: "engine", label: "ENGINE" },
      { name: "Transmission", key: "transmission", label: "TRANSMISSION" },
      { name: "Cooling System", key: "cooling", label: "COOLING SYSTEM" },
      { name: "Radiator", key: "radiator", label: "RADIATOR" },
      { name: "Brake System", key: "brakes", label: "BRAKE SYSTEM" },
      { name: "Battery", key: "battery", label: "BATTERY" },
      { name: "Suspension", key: "suspension", label: "SUSPENSION" },
      { name: "Turbo System", key: "turbo", label: "TURBO SYSTEM" },
      { name: "Air Conditioning", key: "ac", label: "AIR CONDITIONING" },
      { name: "Tires", key: "tires", label: "TIRES" }
    ];

    components.forEach((comp, idx) => {
      const val = vehicleHealth[comp.key];
      
      // Determine status badge
      let badge = "Excellent";
      let badgeColor = "var(--status-excellent)";
      if (val < 50) {
        badge = "Replace Soon";
        badgeColor = "var(--status-critical)";
      } else if (val < 75) {
        badge = "Service Recommended";
        badgeColor = "var(--status-critical)";
      } else if (val < 85) {
        badge = "Needs Attention";
        badgeColor = "var(--status-attention)";
      } else if (val < 92) {
        badge = "Good";
        badgeColor = "var(--status-good)";
      }

      const card = document.createElement("div");
      card.className = "health-card glass-card";
      
      // Generate Canvas element ID
      const canvasId = `canvas-health-${comp.key}`;
      const imgId = `img-health-${comp.key}`;
      
      card.innerHTML = `
        <div class="health-card-illustration" style="width: 100px; height: 100px; display: flex; justify-content: center; align-items: center; margin-bottom: 1.2rem;">
          <img src="assets/${comp.key}.png" alt="${comp.name}" id="${imgId}" style="width:100%; height:100%; object-fit:contain;" onerror="app.fallbackToCanvas('${comp.key}', '${comp.name}', ${val})">
          <canvas id="${canvasId}" width="100" height="100" style="display:none;"></canvas>
        </div>
        <h4 class="health-card-name">${comp.label}</h4>
        
        <div class="progress-ring-wrapper">
          <svg class="progress-ring-circle" width="90" height="90">
            <circle class="progress-ring-bg" stroke-width="6" fill="transparent" r="40" cx="45" cy="45"/>
            <circle id="ring-${comp.key}" class="progress-ring-bar" stroke="${badgeColor}" stroke-width="6" fill="transparent" r="40" cx="45" cy="45"/>
          </svg>
          <span class="health-percentage-text">${val}%</span>
        </div>
        
        <span class="health-status-badge" style="background: rgba(255,255,255,0.03); border:1px solid ${badgeColor}; color:${badgeColor};">${badge}</span>
      `;
      
      grid.appendChild(card);
      
      // Set progress ring offset after rendering
      setTimeout(() => {
        const circle = document.getElementById(`ring-${comp.key}`);
        if(circle) {
          const radius = circle.r.baseVal.value;
          const circumference = 2 * Math.PI * radius;
          const offset = circumference - (val / 100) * circumference;
          circle.style.strokeDasharray = `${circumference} ${circumference}`;
          circle.style.strokeDashoffset = offset;
        }
      }, 50);
    });
  }

  fallbackToCanvas(key, name, val) {
    const img = document.getElementById(`img-health-${key}`);
    const canvas = document.getElementById(`canvas-health-${key}`);
    if (img) img.style.display = "none";
    if (canvas) {
      canvas.style.display = "block";
      this.drawComponentIllustration(`canvas-health-${key}`, name, val);
    }
  }

  drawComponentIllustration(canvasId, name, health) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,100,100);
    
    // Decide neon color theme based on health
    let strokeColor = "#00e676"; // green
    if (health < 50) strokeColor = "#ff3d00"; // red
    else if (health < 75) strokeColor = "#ffc400"; // yellow
    else if (health < 92) strokeColor = "#00b0ff"; // blue
    
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 4;
    ctx.shadowColor = strokeColor;
    
    // Draw technical circle grid
    ctx.beginPath();
    ctx.arc(50, 50, 48, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.shadowColor = "transparent";
    ctx.stroke();

    ctx.strokeStyle = strokeColor;
    ctx.shadowColor = strokeColor;

    // Component-specific blueprint path drawing
    if (name === "Engine") {
      // Draw piston block outline
      ctx.beginPath();
      ctx.rect(30, 35, 40, 30);
      ctx.moveTo(35, 35); ctx.lineTo(40, 20); ctx.lineTo(60, 20); ctx.lineTo(65, 35);
      // Crank pulleys
      ctx.arc(38, 50, 6, 0, Math.PI*2);
      ctx.arc(62, 50, 6, 0, Math.PI*2);
      ctx.stroke();
    } else if (name === "Transmission") {
      // Interlocking gear outline
      ctx.beginPath();
      ctx.arc(42, 42, 14, 0, Math.PI*2);
      ctx.moveTo(68, 58);
      ctx.arc(58, 58, 10, 0, Math.PI*2);
      ctx.stroke();
      // Center hubs
      ctx.beginPath();
      ctx.arc(42, 42, 4, 0, Math.PI*2);
      ctx.arc(58, 58, 3, 0, Math.PI*2);
      ctx.stroke();
    } else if (name === "Cooling System" || name === "Radiator") {
      // Radiator grid structure
      ctx.beginPath();
      ctx.rect(25, 30, 50, 40);
      // horizontal fins
      for(let y=35; y<=65; y+=6) {
        ctx.moveTo(25, y); ctx.lineTo(75, y);
      }
      ctx.stroke();
    } else if (name === "Brake System") {
      // Brake disc rotor and caliper
      ctx.beginPath();
      ctx.arc(50, 50, 25, 0, Math.PI*2); // Rotor
      ctx.stroke();
      
      // Caliper block
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.arc(50, 50, 25, -Math.PI*0.1, Math.PI*0.25);
      ctx.stroke();
      
      // Cross drill holes
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(44, 44, 1, 0, Math.PI*2);
      ctx.arc(56, 56, 1, 0, Math.PI*2);
      ctx.arc(44, 56, 1, 0, Math.PI*2);
      ctx.stroke();
    } else if (name === "Battery") {
      // Battery case
      ctx.beginPath();
      ctx.rect(28, 32, 44, 36);
      // terminals
      ctx.rect(34, 26, 8, 6);
      ctx.rect(58, 26, 8, 6);
      ctx.stroke();
      // charge symbols
      ctx.fillText("+", 60, 44);
      ctx.fillText("-", 36, 44);
    } else if (name === "Suspension") {
      // Spring coils
      ctx.beginPath();
      ctx.moveTo(50, 20);
      ctx.lineTo(50, 30);
      // coil waves
      let curY = 30;
      for (let i = 0; i < 4; i++) {
        ctx.bezierCurveTo(35, curY + 2, 35, curY + 8, 50, curY + 10);
        ctx.bezierCurveTo(65, curY + 12, 65, curY + 18, 50, curY + 20);
        curY += 10;
      }
      ctx.lineTo(50, 80);
      ctx.stroke();
    } else if (name === "Turbo System") {
      // Turbo shell helix scroll
      ctx.beginPath();
      ctx.arc(50, 50, 20, 0, Math.PI*1.5);
      ctx.moveTo(30, 50); ctx.lineTo(15, 50);
      ctx.moveTo(50, 30); ctx.lineTo(50, 15);
      // center blades
      ctx.moveTo(50,50);
      ctx.arc(50, 50, 8, 0, Math.PI*2);
      ctx.stroke();
    } else if (name === "Air Conditioning") {
      // Fan outline and wind waves
      ctx.beginPath();
      ctx.arc(50, 50, 12, 0, Math.PI*2);
      // blades
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
        ctx.moveTo(50, 50);
        ctx.lineTo(50 + 18 * Math.cos(angle), 50 + 18 * Math.sin(angle));
      }
      ctx.stroke();
    } else if (name === "Tires") {
      // Wheel rim and tire thread lines
      ctx.beginPath();
      ctx.arc(50, 50, 28, 0, Math.PI*2); // Outer tire
      ctx.arc(50, 50, 18, 0, Math.PI*2); // Inner rim
      ctx.stroke();
      // Tread markers
      ctx.beginPath();
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
        ctx.moveTo(50 + 24 * Math.cos(a), 50 + 24 * Math.sin(a));
        ctx.lineTo(50 + 28 * Math.cos(a), 50 + 28 * Math.sin(a));
      }
      ctx.stroke();
    }
  }

  // --- SERVICE HISTORY TIMELINE RENDERING ---
  renderHistoryTimeline(vin) {
    const container = document.getElementById("portal-history-timeline");
    if (!container) return;
    
    container.innerHTML = "";
    
    const records = this.history.filter(h => h.vin === vin);
    
    if (records.length === 0) {
      container.innerHTML = `<p style="color:var(--text-muted); font-size:0.95rem; text-align:center; padding: 2rem;">No visits registered in unified database yet.</p>`;
      return;
    }

    // Sort by date descending
    records.sort((a,b) => new Date(b.date) - new Date(a.date));

    records.forEach(rec => {
      const formattedDate = new Date(rec.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
      const partsTags = rec.parts.map(p => `<span class="part-tag">${p}</span>`).join("");
      
      const item = document.createElement("div");
      item.className = "timeline-item";
      
      item.innerHTML = `
        <div class="timeline-marker"></div>
        <div class="timeline-content glass-card">
          <div class="timeline-details">
            <div class="timeline-header">
              <div class="timeline-date-box">
                <span class="timeline-date">${formattedDate}</span>
                <span class="timeline-branch">${rec.branch} Branch</span>
              </div>
              <span class="timeline-mileage"><i class="fa-solid fa-gauge"></i> ${rec.mileage.toLocaleString()} km</span>
            </div>
            <p class="timeline-desc">${rec.details}</p>
            <div class="parts-replaced-list">
              <span style="font-size: 0.75rem; color: var(--text-muted); display: block; width: 100%; font-weight: 700; margin-bottom: 2px;">REPLACED PARTS:</span>
              ${partsTags}
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600; margin-top:0.5rem;">
              Diagnostic report notes: <em style="font-style:normal; color:var(--text-secondary);">${rec.notes || "None"}</em>
            </div>
          </div>
          <div class="timeline-cost-box">
            <span class="timeline-cost">$${rec.cost}</span>
            <span class="timeline-tech"><i class="fa-solid fa-user-gear"></i> ${rec.tech}</span>
          </div>
        </div>
      `;
      
      container.appendChild(item);
    });
  }

  // --- LOYALTY PROGRAM SYSTEM ---
  renderLoyaltyRewards() {
    const list = document.getElementById("rewards-list-container");
    if (!list) return;
    
    list.innerHTML = "";
    
    const rewards = [
      { id: "rew-1", title: "Carbon Cabin Filter", desc: "Premium charcoal cabin air filter replacement, installed free.", cost: 250 },
      { id: "rew-2", title: "Wheel Alignment & Balance", desc: "Complete 4-wheel dynamic balance and alignment check.", cost: 400 },
      { id: "rew-3", title: "Mobil1 Synthetic Oil Change", desc: "Full engine oil change service, up to 6 liters of premium oil.", cost: 800 },
      { id: "rew-4", title: "Autokraft ECU Stage 1 Tune", desc: "Increase engine output by up to 25% with dyno calibration.", cost: 1500 }
    ];

    rewards.forEach(rew => {
      const canAfford = this.activeUser.points >= rew.cost;
      const btnClass = canAfford ? "btn-primary" : "btn-outline";
      const btnText = canAfford ? "Redeem Reward" : "Insufficent Points";
      const disabledAttr = canAfford ? "" : "disabled";

      const card = document.createElement("div");
      card.className = "reward-card glass-card";
      
      card.innerHTML = `
        <div class="reward-details">
          <span class="reward-title">${rew.title}</span>
          <span class="reward-desc">${rew.desc}</span>
          <span class="reward-cost"><i class="fa-solid fa-award"></i> ${rew.cost} pts</span>
        </div>
        <button class="btn ${btnClass}" ${disabledAttr} onclick="app.redeemLoyaltyReward('${rew.id}', ${rew.cost}, '${rew.title}')">
          ${btnText}
        </button>
      `;
      
      list.appendChild(card);
    });

    document.getElementById("loyalty-balance-box").textContent = this.activeUser.points;
  }

  redeemLoyaltyReward(id, cost, title) {
    if (this.activeUser.points < cost) return;
    
    const confirmRedeem = confirm(`Are you sure you want to redeem "${title}" for ${cost} reward points?`);
    if (!confirmRedeem) return;

    // Deduct points
    const customer = this.customers.find(c => c.id === this.activeUser.id);
    customer.points -= cost;
    this.activeUser = customer;
    
    this.saveData();
    this.renderPortal();

    // Notify simulator
    this.logWhatsAppNotification("AUTOKRAFT", `🎁 Reward Unlocked: You successfully redeemed "${title}" for ${cost} points. Bring this ticket to any branch to claim your service.`);
    
    alert(`Reward redeemed! Check your simulated WhatsApp updates for confirmation.`);
  }

  // --- PORTAL DOCUMENTS RENDERING ---
  renderPortalDocuments(vin) {
    const tbody = document.getElementById("portal-documents-table");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    // Query records for invoice simulation
    const records = this.history.filter(h => h.vin === vin);
    
    if (records.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">No documents registered yet.</td></tr>`;
      return;
    }

    records.forEach((rec, idx) => {
      const docId = `DOC-2026-${1000 + idx}`;
      
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><i class="fa-regular fa-file-pdf" style="color:var(--m-red); margin-right:8px;"></i> Service invoice & diagnostic sheet</td>
        <td>${rec.date}</td>
        <td>PDF Invoice</td>
        <td><span class="table-vin-badge">WO-INVC-${idx+10}</span></td>
        <td>
          <button class="btn btn-accent btn-sm" onclick="alert('Downloading simulated document: ${docId}.pdf\\nContains full ECU scan results and labor breakdown.')">
            <i class="fa-solid fa-download"></i> Download
          </button>
        </td>
      `;
      
      tbody.appendChild(tr);
    });
  }

  // --- ADMIN PORTAL RENDERING ---
  renderAdmin() {
    this.renderAdminCustomers();
    this.renderAdminVehicles();
    this.renderAdminBookings();
    this.renderAdminWorkOrders();
    this.renderAdminInventory();
    this.renderAdminTechnicians();
    this.populateWOParentsDropdown();
    
    // Show clock live updates
    const liveTime = document.getElementById("admin-live-time");
    const d = new Date();
    liveTime.textContent = d.toLocaleDateString("en-US", { weekday: "short", hour: "2-digit", minute: "2-digit" });

    // Update global dashboard statistics
    const totalRev = this.history.reduce((acc, h) => acc + h.cost, 0);
    const activeWo = this.workOrders.filter(w => w.status !== "Ready For Delivery" && w.status !== "Delivered").length;
    
    document.getElementById("adm-stat-revenue").textContent = `$${totalRev.toLocaleString()}`;
    document.getElementById("adm-stat-bookings").textContent = this.bookings.filter(b => b.status === "Pending Approval").length;
    document.getElementById("adm-stat-wip").textContent = activeWo;
    document.getElementById("adm-stat-fleet").textContent = this.customers.reduce((acc, c) => acc + c.vehicles.length, 0);
  }

  switchAdminPane(paneName) {
    document.querySelectorAll(".admin-menu-item").forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".admin-pane").forEach(pane => pane.classList.remove("active"));
    
    document.getElementById(`am-${paneName}`).classList.add("active");
    document.getElementById(`admin-pane-${paneName}`).classList.add("active");
  }

  renderAdminCustomers() {
    const tbody = document.getElementById("admin-customers-table");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    this.customers.forEach(cust => {
      const carText = cust.vehicles.map(v => `${v.brand} ${v.model}`).join(", ");
      
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${cust.name}</strong></td>
        <td>${cust.phone}</td>
        <td>${cust.email}</td>
        <td>${carText}</td>
        <td style="color:var(--m-light-blue); font-family:var(--font-mono); font-weight:700;">${cust.points} pts</td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderAdminVehicles() {
    const tbody = document.getElementById("admin-vehicles-table");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    this.customers.forEach(cust => {
      cust.vehicles.forEach(car => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>${car.brand}</strong></td>
          <td>${car.model}</td>
          <td>${car.year}</td>
          <td><span class="vehicle-select-plate">${car.plate}</span></td>
          <td><span class="table-vin-badge">${car.vin}</span></td>
          <td style="font-family:var(--font-mono);">${car.mileage.toLocaleString()} km</td>
          <td>
            <button class="btn btn-accent btn-sm" onclick="app.showVinHistoryDetails('${car.vin}')">
              View History
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
  }

  showVinHistoryDetails(vin) {
    this.switchAdminPane("vinlookup");
    document.getElementById("vin-search-input").value = vin;
    this.executeVINSearch();
  }

  renderAdminBookings() {
    const tbody = document.getElementById("admin-bookings-table");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    const pend = this.bookings;
    
    if (pend.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">No bookings listed.</td></tr>`;
      return;
    }

    pend.forEach(b => {
      const isPending = b.status === "Pending Approval";
      const btnActions = isPending ? `
        <button class="btn btn-accent btn-sm" style="color:var(--status-excellent); border-color:rgba(0,230,118,0.2);" onclick="app.approveBooking('${b.id}')">Approve</button>
        <button class="btn btn-outline btn-sm" style="color:var(--status-critical); border-color:rgba(255,61,0,0.2);" onclick="app.cancelBooking('${b.id}')">Cancel</button>
      ` : `<span style="font-weight:700; color:var(--m-light-blue);">${b.status}</span>`;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${b.date}</strong> <span style="font-size:0.75rem; color:var(--text-muted);">${b.timeSlot}</span></td>
        <td><span class="table-vin-badge" style="background:rgba(0,168,228,0.08);">${b.branch}</span></td>
        <td>${b.customerName}</td>
        <td>${b.vehicleName}</td>
        <td>${b.serviceType}</td>
        <td class="action-row">${btnActions}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  approveBooking(id) {
    const b = this.bookings.find(x => x.id === id);
    if (b) {
      b.status = "Approved";
      this.saveData();
      this.renderAdmin();
      
      // WhatsApp notification
      this.logWhatsAppNotification("AUTOKRAFT", `✅ Booking Approved: Your appointment (ID: ${b.id}) at ${b.branch} on ${b.date} at ${b.timeSlot} is confirmed. We look forward to servicing your ${b.vehicleName}!`);
    }
  }

  cancelBooking(id) {
    const confirmCancel = confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    this.bookings = this.bookings.filter(x => x.id !== id);
    this.saveData();
    this.renderAdmin();
  }

  renderAdminWorkOrders() {
    const tbody = document.getElementById("admin-workorders-table");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    this.workOrders.forEach(wo => {
      // Map status class
      let statusColor = "var(--text-secondary)";
      if (wo.status === "Ready For Delivery") statusColor = "var(--status-excellent)";
      else if (wo.status === "Under Repair") statusColor = "var(--m-light-blue)";
      else if (wo.status === "Waiting For Parts") statusColor = "var(--status-attention)";

      // Select for changing statuses
      const statusSelector = `
        <select class="form-input" style="font-size:0.75rem; padding:0.2rem 0.5rem; width:140px; border-color:${statusColor}; color:${statusColor};" onchange="app.changeWOStatus('${wo.id}', this.value)">
          <option value="Received" ${wo.status === "Received" ? "selected" : ""}>Received</option>
          <option value="Under Inspection" ${wo.status === "Under Inspection" ? "selected" : ""}>Under Inspection</option>
          <option value="Under Repair" ${wo.status === "Under Repair" ? "selected" : ""}>Under Repair</option>
          <option value="Waiting For Parts" ${wo.status === "Waiting For Parts" ? "selected" : ""}>Waiting For Parts</option>
          <option value="Quality Control" ${wo.status === "Quality Control" ? "selected" : ""}>Quality Control</option>
          <option value="Ready For Delivery" ${wo.status === "Ready For Delivery" ? "selected" : ""}>Ready For Delivery</option>
          <option value="Delivered" ${wo.status === "Delivered" ? "selected" : ""}>Delivered</option>
        </select>
      `;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>#${wo.id}</strong></td>
        <td><span class="table-vin-badge">${wo.vin}</span></td>
        <td>${wo.customerName}</td>
        <td>${wo.tech}</td>
        <td style="font-family:var(--font-mono);">${wo.mileage.toLocaleString()} km</td>
        <td>${statusSelector}</td>
        <td>
          <button class="btn btn-outline btn-sm" style="color:var(--status-critical); border-color:rgba(255,61,0,0.1);" onclick="app.deleteWorkOrder('${wo.id}')">
            Delete
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  changeWOStatus(woId, newStatus) {
    const wo = this.workOrders.find(x => x.id === woId);
    if (!wo) return;
    
    const prevStatus = wo.status;
    wo.status = newStatus;
    
    // Find customer & vehicle to update points or mileage if finalizing
    const customer = this.customers.find(c => c.vehicles.some(v => v.vin === wo.vin));
    const vehicle = customer ? customer.vehicles.find(v => v.vin === wo.vin) : null;
    
    // Handle specific status changes
    if (newStatus === "Ready For Delivery" && prevStatus !== "Ready For Delivery") {
      // Calculate reward points earned (1 point per $1 spent)
      const pointsEarned = wo.cost;
      if (customer) {
        customer.points += pointsEarned;
      }
      
      // Update vehicle mileage to the work order mileage
      if (vehicle) {
        vehicle.mileage = wo.mileage;
      }
      
      // Write into Service history timeline
      const newVisit = {
        vin: wo.vin,
        date: new Date().toISOString().split("T")[0],
        mileage: wo.mileage,
        branch: "Sheikh Zayed", // Assume Zayed for WO edits
        tech: wo.tech,
        details: wo.notes,
        parts: wo.parts,
        cost: wo.cost,
        notes: "Work order completed. Full quality inspect verified."
      };
      
      // Update component health: boost repaired parts slightly
      const vehicleHealth = this.health[wo.vin];
      if (vehicleHealth) {
        // Mock components boost
        if (wo.parts.some(p => p.toLowerCase().includes("brake"))) vehicleHealth.brakes = 100;
        if (wo.parts.some(p => p.toLowerCase().includes("spark") || p.toLowerCase().includes("engine"))) vehicleHealth.engine = 98;
        if (wo.parts.some(p => p.toLowerCase().includes("oil"))) vehicleHealth.engine = Math.min(99, vehicleHealth.engine + 5);
        if (wo.parts.some(p => p.toLowerCase().includes("fluid") || p.toLowerCase().includes("gear"))) vehicleHealth.transmission = 98;
        if (wo.parts.some(p => p.toLowerCase().includes("battery"))) vehicleHealth.battery = 100;
        if (wo.parts.some(p => p.toLowerCase().includes("filter"))) vehicleHealth.ac = 98;
        if (wo.parts.some(p => p.toLowerCase().includes("shock") || p.toLowerCase().includes("spring"))) vehicleHealth.suspension = 100;
      } else {
        // Create full report
        this.health[wo.vin] = { engine: 95, transmission: 92, cooling: 90, radiator: 90, brakes: 95, battery: 95, suspension: 90, turbo: 92, ac: 90, tires: 88 };
      }
      
      this.history.push(newVisit);
      
      // Trigger WhatsApp Final
      this.logWhatsAppNotification("AUTOKRAFT", `🏁 Your vehicle ${vehicle ? vehicle.brand + " " + vehicle.model : "car"} is Ready for Delivery! Total cost: $${wo.cost}. You earned ${pointsEarned} reward points. Thank you for choosing AUTOKRAFT!`);
    } else {
      // Dynamic updates for repair stages
      let statusMsg = "";
      if (newStatus === "Received") {
        statusMsg = `🔧 Vehicle Received: We have checked in your car at Sheikh Zayed. Inspector will perform diagnostics shortly.`;
      } else if (newStatus === "Under Inspection") {
        statusMsg = `🔍 Inspection Started: Certified technician is performing a diagnostic scan on your vehicle.`;
      } else if (newStatus === "Under Repair") {
        statusMsg = `⚙️ Repair Started: Technician has begun mechanical repairs. Parts: ${wo.parts.join(", ") || "Inspection items"}.`;
      } else if (newStatus === "Waiting For Parts") {
        statusMsg = `⏳ Waiting For Parts: Repairs are paused. We are fetching OEM replacement components from central warehouse.`;
      } else if (newStatus === "Quality Control") {
        statusMsg = `🔬 Quality Control: Mechanic finished repairs. Senior technician is running dynamic road tests and calibrating control units.`;
      }
      
      if(statusMsg) {
        this.logWhatsAppNotification("AUTOKRAFT", statusMsg);
      }
    }
    
    this.saveData();
    this.renderAdmin();
  }

  deleteWorkOrder(id) {
    const confirmDel = confirm("Are you sure you want to delete this Work Order?");
    if (!confirmDel) return;

    this.workOrders = this.workOrders.filter(w => w.id !== id);
    this.saveData();
    this.renderAdmin();
  }

  showCreateWorkOrderForm() {
    document.getElementById("wo-creation-box").style.display = "block";
  }

  hideCreateWorkOrderForm() {
    document.getElementById("wo-creation-box").style.display = "none";
  }

  populateWOParentsDropdown() {
    const select = document.getElementById("wo-vin");
    if (!select) return;
    
    select.innerHTML = `<option value="" disabled selected>Choose Vehicle VIN</option>`;
    
    this.customers.forEach(cust => {
      cust.vehicles.forEach(car => {
        select.innerHTML += `<option value="${car.vin}">${car.vin} (${cust.name} - ${car.brand} ${car.model})</option>`;
      });
    });

    const techSelect = document.getElementById("wo-tech");
    techSelect.innerHTML = `<option value="" disabled selected>Assign Tech</option>`;
    this.technicians.forEach(t => {
      techSelect.innerHTML += `<option value="${t.name} (${t.specialty})">${t.name} - ${t.specialty}</option>`;
    });
  }

  populateWOCarData(vin) {
    // Find customer
    const cust = this.customers.find(c => c.vehicles.some(v => v.vin === vin));
    const car = cust.vehicles.find(v => v.vin === vin);
    
    if (cust) {
      document.getElementById("wo-customer").value = cust.name;
      document.getElementById("wo-mileage").value = car.mileage;
    }
  }

  handleCreateWorkOrder(e) {
    e.preventDefault();
    const vin = document.getElementById("wo-vin").value;
    const mileage = parseInt(document.getElementById("wo-mileage").value) || 0;
    const tech = document.getElementById("wo-tech").value;
    const partsVal = document.getElementById("wo-parts").value;
    const cost = parseInt(document.getElementById("wo-cost").value) || 0;
    const notes = document.getElementById("wo-notes").value;
    
    const partsArray = partsVal ? partsVal.split(",").map(x => x.trim()) : [];
    
    const customer = this.customers.find(c => c.vehicles.some(v => v.vin === vin));
    const id = `WO-${Math.floor(1000 + Math.random() * 9000)}`;

    const newWO = {
      id,
      vin,
      customerName: customer ? customer.name : "Guest Client",
      mileage,
      tech,
      parts: partsArray,
      cost,
      status: "Received",
      notes,
      date: new Date().toISOString().split("T")[0]
    };

    this.workOrders.push(newWO);
    this.saveData();
    this.renderAdmin();
    this.hideCreateWorkOrderForm();

    // Reset fields
    document.getElementById("wo-parts").value = "";
    document.getElementById("wo-cost").value = "";
    document.getElementById("wo-notes").value = "";

    // Trigger WhatsApp received message
    this.logWhatsAppNotification("AUTOKRAFT", `🔧 Work Order Created: Your vehicle has been checked in under Order #${id} with mileage ${mileage} km. Technical checks are beginning.`);
  }

  renderAdminInventory() {
    const tbody = document.getElementById("admin-inventory-table");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    this.inventory.forEach(item => {
      const isAlert = item.stock <= item.threshold;
      const alertBadge = isAlert ? `
        <span class="badge-status" style="background:rgba(255,61,0,0.1); color:var(--status-critical); border:1px solid var(--status-critical);">RESTOCK REQUIRED</span>
      ` : `
        <span class="badge-status" style="background:rgba(0,230,118,0.1); color:var(--status-excellent); border:1px solid var(--status-excellent);">STABLE</span>
      `;
      
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="font-family:var(--font-mono);">${item.code}</strong></td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td><span style="font-size:0.75rem; color:var(--text-secondary);">${item.compatibility}</span></td>
        <td style="font-family:var(--font-mono); font-weight:700; ${isAlert ? "color:var(--status-critical);" : ""}">${item.stock} units</td>
        <td>${alertBadge}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderAdminTechnicians() {
    const tbody = document.getElementById("admin-technicians-table");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    this.technicians.forEach(t => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${t.name}</strong></td>
        <td><span style="font-size:0.75rem; color:var(--text-secondary);">${t.specialty}</span></td>
        <td>${t.branch}</td>
        <td style="font-family:var(--font-mono);">${t.load}</td>
        <td>
          <span class="badge-status" style="background:rgba(0,230,118,0.1); color:var(--status-excellent); border:1px solid var(--status-excellent);">${t.status}</span>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // --- VIN UNIFIED HISTORY LOOKUP SYSTEM ---
  executeVINSearch() {
    const vinInput = document.getElementById("vin-search-input").value.trim().toUpperCase();
    const resultsBox = document.getElementById("vin-search-results-box");
    const timelineContainer = document.getElementById("vin-search-history-timeline");
    
    if (vinInput.length < 10) {
      alert("Please enter a valid chassis VIN number.");
      return;
    }

    // Find car across all registered users
    let foundCar = null;
    let foundOwner = null;
    
    this.customers.forEach(cust => {
      const carObj = cust.vehicles.find(v => v.vin === vinInput);
      if (carObj) {
        foundCar = carObj;
        foundOwner = cust;
      }
    });

    if (!foundCar) {
      resultsBox.style.display = "none";
      alert("No vehicle matching this VIN was found in the global database. Ensure the chassis registration exists.");
      return;
    }

    // Populate metadata
    resultsBox.style.display = "block";
    document.getElementById("vin-search-model-title").textContent = `${foundCar.brand} ${foundCar.model}`;
    document.getElementById("vin-search-vin-badge").textContent = foundCar.vin;
    document.getElementById("vin-search-owner").textContent = foundOwner.name;
    document.getElementById("vin-search-phone").textContent = foundOwner.phone;
    document.getElementById("vin-search-plate").textContent = foundCar.plate;
    document.getElementById("vin-search-mileage").textContent = `${foundCar.mileage.toLocaleString()} km`;

    // Render timeline records matching this VIN
    timelineContainer.innerHTML = "";
    const records = this.history.filter(h => h.vin === vinInput);
    
    if (records.length === 0) {
      timelineContainer.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem; padding: 1.5rem; text-align:center;">No visit records found. Vehicle registration holds zero history entries.</p>`;
      return;
    }

    // Sort timeline descending
    records.sort((a,b) => new Date(b.date) - new Date(a.date));

    records.forEach(rec => {
      const formattedDate = new Date(rec.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
      const partsTags = rec.parts.map(p => `<span class="part-tag">${p}</span>`).join("");
      
      const item = document.createElement("div");
      item.className = "timeline-item";
      
      item.innerHTML = `
        <div class="timeline-marker"></div>
        <div class="timeline-content glass-card">
          <div class="timeline-details">
            <div class="timeline-header">
              <div class="timeline-date-box">
                <span class="timeline-date">${formattedDate}</span>
                <span class="timeline-branch" style="background:rgba(255, 14, 60, 0.08); color:var(--m-red); border:1px solid rgba(255, 14, 60, 0.2);">${rec.branch} Branch</span>
              </div>
              <span class="timeline-mileage"><i class="fa-solid fa-gauge"></i> ${rec.mileage.toLocaleString()} km</span>
            </div>
            <p class="timeline-desc">${rec.details}</p>
            <div class="parts-replaced-list">
              ${partsTags}
            </div>
          </div>
          <div class="timeline-cost-box">
            <span class="timeline-cost">$${rec.cost}</span>
            <span class="timeline-tech"><i class="fa-solid fa-user-gear"></i> ${rec.tech}</span>
          </div>
        </div>
      `;
      timelineContainer.appendChild(item);
    });
  }

  // --- WHATSAPP SIMULATOR INTEGRATION ---
  toggleWhatsAppTray() {
    const tray = document.getElementById("wa-chat-tray");
    const trigger = document.getElementById("wa-trigger-btn");
    
    tray.classList.toggle("active");
    
    if(tray.classList.contains("active")) {
      trigger.classList.add("hidden");
      this.scrollWhatsAppToBottom();
    } else {
      trigger.classList.remove("hidden");
    }
  }

  openWhatsAppSimulator() {
    const tray = document.getElementById("wa-chat-tray");
    const trigger = document.getElementById("wa-trigger-btn");
    
    tray.classList.add("active");
    trigger.classList.add("hidden");
    
    this.scrollWhatsAppToBottom();
  }

  logWhatsAppNotification(sender, text) {
    const d = new Date();
    const timeStr = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    
    this.notifications.push({ sender, text, time: timeStr });
    
    const body = document.getElementById("wa-chat-body");
    if (!body) return;
    
    const isAutokraft = sender === "AUTOKRAFT";
    const msgClass = isAutokraft ? "received" : "sent";
    
    body.innerHTML += `
      <div class="whatsapp-msg ${msgClass}">
        ${text}
        <div class="whatsapp-msg-time">${timeStr}</div>
      </div>
    `;
    
    this.scrollWhatsAppToBottom();
    
    // Play subtle notification alert chime simulation
    // If not tray opened, glow trigger button
    const tray = document.getElementById("wa-chat-tray");
    const trigger = document.getElementById("wa-trigger-btn");
    if (!tray.classList.contains("active")) {
      trigger.style.boxShadow = "0 0 25px #25d366, 0 4px 15px rgba(37, 211, 102, 0.4)";
      setTimeout(() => {
        trigger.style.boxShadow = "";
      }, 1000);
    }
  }

  sendWhatsAppUserMsg() {
    const input = document.getElementById("wa-chat-input");
    const val = input.value.trim();
    if (!val) return;
    
    input.value = "";
    this.logWhatsAppNotification("User", val);

    // Simulated helper agent reply
    setTimeout(() => {
      let replyText = "Thank you for reaching out to AUTOKRAFT support. An advisor will review your message shortly. For immediate booking adjustments, please use our Book Service panel.";
      
      const lower = val.toLowerCase();
      if (lower.includes("hello") || lower.includes("hi")) {
        replyText = "Hello! Autokraft support agent at your service. How can we assist with your BMW, MINI or Porsche today?";
      } else if (lower.includes("status") || lower.includes("track")) {
        replyText = "To track live vehicle maintenance stages, please sign into your Customer Portal. Our mechanics log every repair step instantly.";
      } else if (lower.includes("price") || lower.includes("cost")) {
        replyText = "Diagnostic sweeps start at $100. Specific repair estimates require a physical inspection at Lebini, Zayed, or Maadi centers. We only source genuine OEM parts.";
      }
      
      this.logWhatsAppNotification("AUTOKRAFT", replyText);
    }, 1200);
  }

  scrollWhatsAppToBottom() {
    const body = document.getElementById("wa-chat-body");
    if(body) {
      setTimeout(() => {
        body.scrollTop = body.scrollHeight;
      }, 50);
    }
  }
}

// Instantiate global app instance
const app = new AutoKraftPlatform();
