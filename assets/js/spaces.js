/*
 * Available spaces — edit this list to update the site.
 *
 * Each space:
 *   id          unique, no spaces (used for links and the inquiry form)
 *   name        shown in the table
 *   use         e.g. "Office", "Restaurant / Retail"
 *   size        rentable square feet (number)
 *   rent        display text for the asking rent
 *   summary     a paragraph shown when the row is expanded
 *   details     label/value pairs shown in the details grid
 *   features    short bullet points
 *   photos      [{ src, alt }] — leave empty to show "Photos coming soon"
 *
 * To add photos for a space: put the files in assets/img/ and list them here.
 */
window.BP_SPACES = [
  {
    id: "suites-150-160",
    name: "1st Floor · Suites 150 & 160",
    use: "Restaurant / Retail",
    size: 4085,
    rent: "$2.00 /SF/MO + NNN",
    summary:
      "Turnkey restaurant space, formerly Ristorante Italiano. Large windows, high exposed ceilings, a separate bar in a glass-roofed sunroom with plenty of natural light, and men's and women's restrooms exclusive to the space. Includes a large outdoor patio for dining and events.",
    details: [
      ["Date available", "Now"],
      ["Lease term", "Negotiable"],
      ["Condition", "Full build-out — restaurant / café"],
      ["Outdoor patio", "±1,420 SF"],
      ["NNN (est.)", "±$0.45 /SF/MO"],
      ["Restrooms", "Private, men's & women's"]
    ],
    features: [
      "Turnkey restaurant build-out",
      "Sunroom bar with glass ceiling",
      "±1,420 SF outdoor patio",
      "Private restrooms",
      "Wheelchair accessible"
    ],
    photos: [
      { src: "assets/img/rest-dining.jpg", alt: "Main dining room with murals" },
      { src: "assets/img/rest-sunroom.jpg", alt: "Glass-roofed sunroom dining" },
      { src: "assets/img/rest-bar.jpg", alt: "Full bar" },
      { src: "assets/img/rest-sunroom-2.jpg", alt: "Sunroom seating" },
      { src: "assets/img/rest-patio.jpg", alt: "Outdoor patio" },
      { src: "assets/img/rest-patio-2.jpg", alt: "Patio with heaters and planters" },
      { src: "assets/img/rest-banquet.jpg", alt: "Private dining area" },
      { src: "assets/img/rest-patio-3.jpg", alt: "Patio seating" }
    ]
  },
  {
    id: "2nd-floor-office",
    name: "2nd Floor Office",
    use: "Office",
    size: 1274,
    rent: "$1.85 – $1.95 /SF/MO + NNN",
    summary:
      "Built-out office suite in the historic main building. Office-intensive layout with partitioned private offices, suited to 4–11 people. Elevator access, shared restrooms, and the building's large on-site parking lot.",
    details: [
      ["Date available", "Now"],
      ["Lease term", "Negotiable"],
      ["Condition", "Full build-out — standard office"],
      ["Occupancy", "Fits 4–11 people"],
      ["Access", "Elevator"],
      ["Restrooms", "Shared"]
    ],
    features: [
      "Partitioned private offices",
      "Elevator access",
      "Large on-site parking lot",
      "Close to Seabright and Downtown"
    ],
    photos: []
  }
];
