(function () {
  var spaces = window.BP_SPACES || [];
  var config = window.BP_CONFIG || {};

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") node.textContent = attrs[k];
      else if (k === "html") node.innerHTML = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }
  function fmtSize(n) { return n.toLocaleString("en-US") + " SF"; }

  /* ---------- Header ---------- */
  var header = document.querySelector(".site-header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileNav.hidden = !open;
  }
  toggle.addEventListener("click", function () { setMenu(mobileNav.hidden); });
  mobileNav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });

  /* ---------- Spaces ---------- */
  var list = document.getElementById("spaces-list");
  var select = document.getElementById("space-select");
  document.getElementById("space-count").textContent = spaces.length;

  var chevron = '<svg width="14" height="9" viewBox="0 0 14 9" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M1 1.5l6 6 6-6"/></svg>';

  spaces.forEach(function (s, i) {
    var panelId = "space-panel-" + s.id;
    var toggleBtn = el("button", { "class": "space-toggle", type: "button", "aria-expanded": "false", "aria-controls": panelId });
    toggleBtn.innerHTML = '<span>View details</span>' + chevron;
    var nameBtn = el("button", { "class": "space-name", type: "button", "aria-controls": panelId, text: s.name });

    function cell(label, value) {
      return el("div", { role: "cell" }, [el("span", { "class": "space-cell-label", text: label }), el("span", { text: value })]);
    }

    var row = el("div", { "class": "spaces-row", role: "row" }, [
      el("div", { role: "cell" }, [nameBtn]),
      cell("Space use", s.use),
      cell("Size", fmtSize(s.size)),
      cell("Rent", s.rent),
      el("div", { role: "cell", "class": "col-details" }, [toggleBtn])
    ]);

    // Panel
    var details = el("dl", { "class": "space-details" }, (s.details || []).map(function (d) {
      return el("div", {}, [el("dt", { text: d[0] + ":" }), el("dd", { text: d[1] })]);
    }));
    var features = el("ul", { "class": "space-features" }, (s.features || []).map(function (f) { return el("li", { text: f }); }));
    var inquireBtn = el("a", { "class": "btn btn-outline", href: "#inquire", "data-space": s.name, text: "Inquire about this space" });

    var photos;
    if (s.photos && s.photos.length) {
      var MAX = 7; // 1 large + 6 thumbnails; the rest open in the viewer
      photos = el("div", { "class": "space-photos", "data-gallery": s.id }, s.photos.map(function (p, n) {
        var small = p.src.replace(/\.jpg$/, "-800.jpg");
        var btn = el("button", { "class": "gallery-item", type: "button", "data-src": p.src, "aria-label": "View photo: " + (p.alt || "") }, [
          el("img", { src: small, alt: p.alt || "", loading: "lazy" })
        ]);
        if (n >= MAX) btn.hidden = true;
        if (n === MAX - 1 && s.photos.length > MAX) btn.appendChild(el("span", { "class": "gallery-more", text: "+" + (s.photos.length - MAX) + " more" }));
        return btn;
      }));
    } else {
      photos = el("div", { "class": "photos-empty" }, [
        el("div", { html: "<strong>Photos coming soon</strong>Ask us for a walkthrough or a tour of this space." })
      ]);
    }

    var panel = el("div", { "class": "space-panel", id: panelId, hidden: "" }, [
      el("div", { "class": "space-panel-inner" }, [
        el("div", {}, [el("p", { "class": "space-summary", text: s.summary }), details, features, inquireBtn]),
        photos
      ])
    ]);

    var item = el("div", { "class": "space", id: "space-" + s.id }, [row, panel]);
    list.appendChild(item);

    function setOpen(open) {
      item.classList.toggle("open", open);
      panel.hidden = !open;
      toggleBtn.setAttribute("aria-expanded", String(open));
      nameBtn.setAttribute("aria-expanded", String(open));
      toggleBtn.querySelector("span").textContent = open ? "Hide details" : "View details";
    }
    toggleBtn.addEventListener("click", function () { setOpen(panel.hidden); });
    nameBtn.addEventListener("click", function () { setOpen(panel.hidden); });
    if (i === 0) setOpen(true);

    select.appendChild(el("option", { value: s.name, text: s.name + " — " + fmtSize(s.size) }));
  });

  // "Inquire about this space" preselects the space
  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-space]");
    if (link) select.value = link.getAttribute("data-space");
  });

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = lightbox.querySelector("img");
  var lbCount = lightbox.querySelector(".lightbox-count");
  var current = [], index = 0;

  function show(i) {
    index = (i + current.length) % current.length;
    var btn = current[index];
    lbImg.src = btn.getAttribute("data-src");
    lbImg.alt = btn.querySelector("img").alt;
    lbCount.textContent = (index + 1) + " / " + current.length;
  }
  document.addEventListener("click", function (e) {
    var item = e.target.closest(".gallery-item");
    if (!item) return;
    var group = item.closest("[data-gallery]");
    current = Array.prototype.slice.call(group.querySelectorAll(".gallery-item"));
    show(current.indexOf(item));
    if (lightbox.showModal) lightbox.showModal(); else lightbox.setAttribute("open", "");
  });
  lightbox.querySelector(".lightbox-close").addEventListener("click", function () { lightbox.close(); });
  lightbox.querySelector(".prev").addEventListener("click", function () { show(index - 1); });
  lightbox.querySelector(".next").addEventListener("click", function () { show(index + 1); });
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) lightbox.close(); });
  lightbox.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  /* ---------- Inquiry form ---------- */
  var form = document.getElementById("inquiry-form");
  var status = form.querySelector(".form-status");
  var submit = form.querySelector('button[type="submit"]');

  function setStatus(msg, type) {
    status.hidden = false;
    status.textContent = msg;
    status.className = "form-status" + (type ? " " + type : "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var invalid = [];
    form.querySelectorAll("[required]").forEach(function (f) {
      var bad = !f.value.trim() || !f.checkValidity();
      f.closest(".field").classList.toggle("invalid", bad);
      if (bad) invalid.push(f);
    });
    if (invalid.length) {
      setStatus("Please fill in the required fields.", "error");
      invalid[0].focus();
      return;
    }

    if (!config.inquiryEmail) {
      setStatus("Inquiries aren't connected yet. Add an email address in assets/js/config.js to start receiving them.", "error");
      return;
    }

    var data = Object.fromEntries(new FormData(form).entries());
    data._subject = "Branciforte Plaza inquiry — " + data.space;
    data._template = "table";
    data._captcha = "false";

    submit.disabled = true;
    setStatus("Sending…");
    fetch("https://formsubmit.co/ajax/" + encodeURIComponent(config.inquiryEmail), {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
      .then(function (res) {
        if (!res.ok || String(res.body.success) === "false") throw new Error(res.body.message || "Request failed");
        form.reset();
        setStatus("Thank you — your inquiry has been sent. We'll be in touch soon.", "success");
      })
      .catch(function () {
        setStatus("Sorry, something went wrong sending your inquiry. Please try again in a moment.", "error");
      })
      .finally(function () { submit.disabled = false; });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
