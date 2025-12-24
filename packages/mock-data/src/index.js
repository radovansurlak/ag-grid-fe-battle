const TABLE_COUNT = 100;
const ROW_COUNT = 500;

const NAMES = [
  "Ava Martin",
  "Noah Davis",
  "Mia Clark",
  "Liam Lewis",
  "Emma Walker",
  "Lucas Young",
  "Olivia Hall",
  "Mason Allen",
  "Sophia King",
  "Ethan Wright"
];
const COUNTRIES = ["USA", "Canada", "UK", "Germany", "France", "Spain", "Italy", "Japan"];
const CITIES = ["Austin", "Berlin", "Toronto", "Paris", "Madrid", "Milan", "Osaka", "Denver"];
const STATUSES = ["New", "Active", "On Hold", "Closed"];
const DEPARTMENTS = ["Engineering", "Sales", "Support", "Finance", "Design"];
const ROLES = ["IC", "Lead", "Manager", "Director"];
const PRIORITIES = ["Low", "Medium", "High", "Critical"];
const DOMAINS = ["example.com", "mail.test", "demo.io", "sample.net"];
const TAGS = ["Alpha", "Beta", "Gamma", "Delta", "Omega"];
const CATEGORIES = ["A", "B", "C", "D", "E"];
const SOURCES = ["API", "Import", "Manual", "Sync"];
const TIERS = ["Free", "Pro", "Business", "Enterprise"];
const REGIONS = ["NA", "EU", "APAC", "LATAM"];
const OWNERS = ["Team Blue", "Team Red", "Team Green", "Team Gold"];

const DATE_START = new Date("2021-01-01").getTime();
const DATE_END = new Date("2024-12-31").getTime();

function mulberry32(seed) {
  let t = seed;
  return function random() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(list, rand) {
  return list[Math.floor(rand() * list.length)];
}

function randomBetween(rand, min, max) {
  return Math.floor(rand() * (max - min + 1)) + min;
}

function randomDate(rand) {
  return new Date(DATE_START + rand() * (DATE_END - DATE_START));
}

function formatDate(params) {
  const value = params.value;
  if (!(value instanceof Date)) {
    return value || "";
  }
  return value.toISOString().slice(0, 10);
}

const COLUMN_DEFS = [
  { field: "id", headerName: "ID", width: 90, cellEditor: "agNumberCellEditor" },
  { field: "name", headerName: "Name", minWidth: 160, cellEditor: "agTextCellEditor" },
  { field: "age", headerName: "Age", width: 90, cellEditor: "agNumberCellEditor" },
  {
    field: "country",
    headerName: "Country",
    minWidth: 140,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: COUNTRIES }
  },
  { field: "city", headerName: "City", minWidth: 140, cellEditor: "agTextCellEditor" },
  { field: "email", headerName: "Email", minWidth: 200, cellEditor: "agTextCellEditor" },
  { field: "phone", headerName: "Phone", minWidth: 160, cellEditor: "agTextCellEditor" },
  {
    field: "status",
    headerName: "Status",
    minWidth: 140,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: STATUSES }
  },
  {
    field: "active",
    headerName: "Active",
    width: 110,
    cellEditor: "agCheckboxCellEditor",
    cellRenderer: "agCheckboxCellRenderer"
  },
  { field: "score", headerName: "Score", width: 110, cellEditor: "agNumberCellEditor" },
  {
    field: "joined",
    headerName: "Joined",
    minWidth: 140,
    cellEditor: "agDateCellEditor",
    valueFormatter: formatDate
  },
  {
    field: "department",
    headerName: "Department",
    minWidth: 160,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: DEPARTMENTS }
  },
  {
    field: "role",
    headerName: "Role",
    minWidth: 140,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: ROLES }
  },
  { field: "budget", headerName: "Budget", minWidth: 140, cellEditor: "agNumberCellEditor" },
  { field: "rating", headerName: "Rating", width: 110, cellEditor: "agNumberCellEditor" },
  {
    field: "notes",
    headerName: "Notes",
    minWidth: 220,
    cellEditor: "agLargeTextCellEditor",
    cellEditorPopup: true
  },
  {
    field: "priority",
    headerName: "Priority",
    minWidth: 140,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: PRIORITIES }
  },
  { field: "progress", headerName: "Progress", minWidth: 140, cellEditor: "agNumberCellEditor" },
  {
    field: "dueDate",
    headerName: "Due Date",
    minWidth: 140,
    cellEditor: "agDateCellEditor",
    valueFormatter: formatDate
  },
  { field: "website", headerName: "Website", minWidth: 180, cellEditor: "agTextCellEditor" },
  {
    field: "tag",
    headerName: "Tag",
    minWidth: 120,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: TAGS }
  },
  {
    field: "category",
    headerName: "Category",
    minWidth: 140,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: CATEGORIES }
  },
  {
    field: "source",
    headerName: "Source",
    minWidth: 140,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: SOURCES }
  },
  {
    field: "tier",
    headerName: "Tier",
    minWidth: 140,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: TIERS }
  },
  {
    field: "region",
    headerName: "Region",
    minWidth: 120,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: REGIONS }
  },
  {
    field: "owner",
    headerName: "Owner",
    minWidth: 160,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: OWNERS }
  },
  { field: "slaDays", headerName: "SLA Days", width: 120, cellEditor: "agNumberCellEditor" },
  { field: "capacity", headerName: "Capacity", width: 120, cellEditor: "agNumberCellEditor" },
  {
    field: "approved",
    headerName: "Approved",
    width: 130,
    cellEditor: "agCheckboxCellEditor",
    cellRenderer: "agCheckboxCellRenderer"
  },
  {
    field: "budgetNotes",
    headerName: "Budget Notes",
    minWidth: 220,
    cellEditor: "agLargeTextCellEditor",
    cellEditorPopup: true
  }
];

const DEFAULT_COL_DEF = {
  editable: true,
  resizable: true,
  sortable: false,
  filter: false,
  minWidth: 110
};

function createRow(rand, rowId) {
  const name = pick(NAMES, rand);
  const [firstName, lastName] = name.split(" ");
  const country = pick(COUNTRIES, rand);
  const city = pick(CITIES, rand);
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${pick(DOMAINS, rand)}`;

  return {
    id: rowId,
    name,
    age: randomBetween(rand, 20, 65),
    country,
    city,
    email,
    phone: `+1-${randomBetween(rand, 200, 999)}-${randomBetween(rand, 200, 999)}-${randomBetween(rand, 1000, 9999)}`,
    status: pick(STATUSES, rand),
    active: rand() > 0.5,
    score: randomBetween(rand, 10, 100),
    joined: randomDate(rand),
    department: pick(DEPARTMENTS, rand),
    role: pick(ROLES, rand),
    budget: randomBetween(rand, 5000, 200000),
    rating: randomBetween(rand, 1, 5),
    notes: `Note ${rowId} - ${pick(PRIORITIES, rand)}`,
    priority: pick(PRIORITIES, rand),
    progress: randomBetween(rand, 0, 100),
    dueDate: randomDate(rand),
    website: `https://www.${firstName.toLowerCase()}-${lastName.toLowerCase()}.dev`,
    tag: pick(TAGS, rand),
    category: pick(CATEGORIES, rand),
    source: pick(SOURCES, rand),
    tier: pick(TIERS, rand),
    region: pick(REGIONS, rand),
    owner: pick(OWNERS, rand),
    slaDays: randomBetween(rand, 1, 45),
    capacity: randomBetween(rand, 25, 200),
    approved: rand() > 0.6,
    budgetNotes: `Budget ${rowId} - ${pick(OWNERS, rand)}`
  };
}

function createTables({ tableCount = TABLE_COUNT, rowCount = ROW_COUNT, seedOffset = 0 } = {}) {
  const tables = [];
  const baseSeed = 12345 + seedOffset * 100000;

  for (let tableIndex = 0; tableIndex < tableCount; tableIndex += 1) {
    const rand = mulberry32(baseSeed + tableIndex * 997);
    const rows = [];

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
      const rowId = tableIndex * rowCount + rowIndex + 1;
      rows.push(createRow(rand, rowId));
    }

    tables.push({
      id: tableIndex + 1,
      rows
    });
  }

  return tables;
}

export { COLUMN_DEFS, DEFAULT_COL_DEF, TABLE_COUNT, ROW_COUNT, createTables };
