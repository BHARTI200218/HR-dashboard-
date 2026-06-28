
import { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from "recharts";

// ── SAMPLE DATA ──────────────────────────────────────────────────────────────
const employees = [
  { id: "E001", name: "Aarav Sharma",     dept: "Engineering",  role: "Senior Dev",       salary: 920000, age: 31, gender: "Male",   status: "Active",   joined: "2021-03",  rating: 4.5, location: "Bangalore" },
  { id: "E002", name: "Priya Mehta",      dept: "HR",           role: "HR Manager",        salary: 750000, age: 35, gender: "Female", status: "Active",   joined: "2019-07",  rating: 4.8, location: "Mumbai"    },
  { id: "E003", name: "Rohan Verma",      dept: "Sales",        role: "Sales Executive",   salary: 480000, age: 27, gender: "Male",   status: "Active",   joined: "2023-01",  rating: 3.9, location: "Delhi"     },
  { id: "E004", name: "Sneha Patil",      dept: "Finance",      role: "Finance Analyst",   salary: 680000, age: 29, gender: "Female", status: "Active",   joined: "2022-06",  rating: 4.2, location: "Pune"      },
  { id: "E005", name: "Karan Singh",      dept: "Engineering",  role: "Junior Dev",        salary: 550000, age: 24, gender: "Male",   status: "Active",   joined: "2023-08",  rating: 3.7, location: "Hyderabad" },
  { id: "E006", name: "Anjali Rao",       dept: "Marketing",    role: "Content Lead",      salary: 620000, age: 30, gender: "Female", status: "Active",   joined: "2020-11",  rating: 4.4, location: "Bangalore" },
  { id: "E007", name: "Vikram Nair",      dept: "Operations",   role: "Ops Manager",       salary: 810000, age: 38, gender: "Male",   status: "On Leave", joined: "2018-04",  rating: 4.1, location: "Chennai"   },
  { id: "E008", name: "Divya Joshi",      dept: "HR",           role: "Recruiter",         salary: 420000, age: 25, gender: "Female", status: "Active",   joined: "2024-01",  rating: 4.0, location: "Mumbai"    },
  { id: "E009", name: "Nikhil Gupta",     dept: "Engineering",  role: "Tech Lead",         salary: 1100000,age: 34, gender: "Male",   status: "Active",   joined: "2020-02",  rating: 4.7, location: "Pune"      },
  { id: "E010", name: "Meera Iyer",       dept: "Finance",      role: "CFO Analyst",       salary: 870000, age: 33, gender: "Female", status: "Active",   joined: "2019-09",  rating: 4.6, location: "Bangalore" },
  { id: "E011", name: "Siddharth Das",    dept: "Sales",        role: "Sales Manager",     salary: 760000, age: 37, gender: "Male",   status: "Resigned", joined: "2017-06",  rating: 3.5, location: "Delhi"     },
  { id: "E012", name: "Pooja Krishnan",   dept: "Marketing",    role: "Digital Marketer",  salary: 510000, age: 26, gender: "Female", status: "Active",   joined: "2022-03",  rating: 4.1, location: "Hyderabad" },
  { id: "E013", name: "Rahul Bose",       dept: "Operations",   role: "Supply Chain",      salary: 590000, age: 28, gender: "Male",   status: "Active",   joined: "2021-11",  rating: 3.8, location: "Kolkata"   },
  { id: "E014", name: "Tanvi Shah",       dept: "Engineering",  role: "QA Engineer",       salary: 530000, age: 26, gender: "Female", status: "Active",   joined: "2023-04",  rating: 4.0, location: "Mumbai"    },
  { id: "E015", name: "Aditya Kumar",     dept: "HR",           role: "HR Executive",      salary: 380000, age: 23, gender: "Male",   status: "Active",   joined: "2024-02",  rating: 3.9, location: "Delhi"     },
  { id: "E016", name: "Ritu Agarwal",     dept: "Finance",      role: "Tax Consultant",    salary: 720000, age: 32, gender: "Female", status: "On Leave", joined: "2020-08",  rating: 4.3, location: "Lucknow"   },
  { id: "E017", name: "Manish Tiwari",    dept: "Sales",        role: "BD Executive",      salary: 450000, age: 25, gender: "Male",   status: "Active",   joined: "2023-10",  rating: 3.6, location: "Bhopal"    },
  { id: "E018", name: "Nisha Kulkarni",   dept: "Marketing",    role: "Brand Manager",     salary: 830000, age: 36, gender: "Female", status: "Active",   joined: "2018-12",  rating: 4.5, location: "Pune"      },
  { id: "E019", name: "Arjun Pillai",     dept: "Engineering",  role: "DevOps",            salary: 780000, age: 30, gender: "Male",   status: "Active",   joined: "2021-07",  rating: 4.2, location: "Bangalore" },
  { id: "E020", name: "Kavya Reddy",      dept: "Operations",   role: "Analyst",           salary: 490000, age: 27, gender: "Female", status: "Active",   joined: "2022-09",  rating: 4.0, location: "Hyderabad" },
];

const hiringTrend = [
  { month: "Jan", hired: 3, resigned: 1 },
  { month: "Feb", hired: 5, resigned: 2 },
  { month: "Mar", hired: 4, resigned: 0 },
  { month: "Apr", hired: 6, resigned: 3 },
  { month: "May", hired: 8, resigned: 1 },
  { month: "Jun", hired: 5, resigned: 2 },
  { month: "Jul", hired: 7, resigned: 4 },
  { month: "Aug", hired: 9, resigned: 2 },
  { month: "Sep", hired: 6, resigned: 1 },
  { month: "Oct", hired: 11, resigned: 3 },
  { month: "Nov", hired: 4, resigned: 2 },
  { month: "Dec", hired: 3, resigned: 1 },
];

const attendanceData = [
  { month: "Jan", present: 92, absent: 5, late: 3 },
  { month: "Feb", present: 88, absent: 7, late: 5 },
  { month: "Mar", present: 94, absent: 4, late: 2 },
  { month: "Apr", present: 90, absent: 6, late: 4 },
  { month: "May", present: 87, absent: 8, late: 5 },
  { month: "Jun", present: 95, absent: 3, late: 2 },
];

const COLORS = ["#1A2E4A", "#2E6DA4", "#3B9BD4", "#6BB8E8", "#A8D5F0", "#C8E8F8"];
const DEPT_COLORS = {
  Engineering: "#1A2E4A",
  HR: "#2E6DA4",
  Sales: "#3B9BD4",
  Finance: "#6BB8E8",
  Marketing: "#4A90C4",
  Operations: "#7CB8DC",
};

const NAVY   = "#1A2E4A";
const ACCENT = "#2E6DA4";
const LIGHT  = "#EAF2FB";
const MID    = "#3B9BD4";

// ── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (n) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString()}`;

const departments = ["All", ...Array.from(new Set(employees.map((e) => e.dept)))];
const statuses    = ["All", "Active", "On Leave", "Resigned"];

// ── COMPONENTS ───────────────────────────────────────────────────────────────
const KPICard = ({ label, value, sub, color = ACCENT, icon }) => (
  <div style={{
    background: "#fff", borderRadius: 12, padding: "20px 22px",
    boxShadow: "0 2px 12px rgba(26,46,74,0.08)",
    borderTop: `4px solid ${color}`, minWidth: 0,
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ fontSize: 12, color: "#6B7A99", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
        <div style={{ fontSize: 30, fontWeight: 800, color: NAVY, lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ fontSize: 12, color: "#6B7A99", marginTop: 6 }}>{sub}</div>}
      </div>
      <div style={{ fontSize: 28, opacity: 0.15 }}>{icon}</div>
    </div>
  </div>
);

const SectionTitle = ({ children }) => (
  <div style={{ fontSize: 14, fontWeight: 700, color: NAVY, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 14, paddingBottom: 8, borderBottom: `2px solid ${LIGHT}` }}>
    {children}
  </div>
);

// ── MAIN DASHBOARD ────────────────────────────────────────────────────────────
export default function HRDashboard() {
  const [dept, setDept]     = useState("All");
  const [status, setStatus] = useState("All");
  const [minSal, setMinSal] = useState(300000);
  const [maxSal, setMaxSal] = useState(1200000);
  const [minRating, setMinRating] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const filtered = useMemo(() => {
    let d = employees.filter((e) =>
      (dept === "All" || e.dept === dept) &&
      (status === "All" || e.status === status) &&
      e.salary >= minSal && e.salary <= maxSal &&
      e.rating >= minRating &&
      (search === "" || e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()))
    );
    return d.sort((a, b) => {
      let va = a[sortBy], vb = b[sortBy];
      if (typeof va === "string") { va = va.toLowerCase(); vb = vb.toLowerCase(); }
      return sortDir === "asc" ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });
  }, [dept, status, minSal, maxSal, minRating, search, sortBy, sortDir]);

  // Derived aggregates from filtered
  const avgSalary  = filtered.length ? Math.round(filtered.reduce((s, e) => s + e.salary, 0) / filtered.length) : 0;
  const avgRating  = filtered.length ? (filtered.reduce((s, e) => s + e.rating, 0) / filtered.length).toFixed(1) : 0;
  const activeCount = filtered.filter((e) => e.status === "Active").length;

  const deptDist = useMemo(() => {
    const map = {};
    filtered.forEach((e) => { map[e.dept] = (map[e.dept] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [filtered]);

  const salaryByDept = useMemo(() => {
    const map = {};
    filtered.forEach((e) => {
      if (!map[e.dept]) map[e.dept] = { total: 0, count: 0 };
      map[e.dept].total += e.salary; map[e.dept].count++;
    });
    return Object.entries(map).map(([dept, v]) => ({ dept, avg: Math.round(v.total / v.count) }));
  }, [filtered]);

  const genderDist = useMemo(() => {
    const m = filtered.filter((e) => e.gender === "Male").length;
    const f = filtered.filter((e) => e.gender === "Female").length;
    return [{ name: "Male", value: m }, { name: "Female", value: f }];
  }, [filtered]);

  const handleSort = (col) => {
    if (sortBy === col) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("asc"); }
  };

  const statusBadge = (s) => {
    const colors = { Active: "#22C55E", "On Leave": "#F59E0B", Resigned: "#EF4444" };
    return (
      <span style={{ background: colors[s] + "22", color: colors[s], borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>
        {s}
      </span>
    );
  };

  const Th = ({ col, label }) => (
    <th onClick={() => handleSort(col)} style={{ padding: "11px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: 0.8, textTransform: "uppercase", cursor: "pointer", userSelect: "none", background: NAVY, whiteSpace: "nowrap" }}>
      {label} {sortBy === col ? (sortDir === "asc" ? "↑" : "↓") : <span style={{ opacity: 0.3 }}>↕</span>}
    </th>
  );

  const FilterSelect = ({ label, value, onChange, options }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: "#6B7A99", letterSpacing: 0.8, textTransform: "uppercase" }}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{ padding: "8px 12px", borderRadius: 8, border: `1.5px solid #D0DFF0`, fontSize: 13, color: NAVY, background: "#fff", outline: "none", minWidth: 130 }}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  const SliderFilter = ({ label, value, onChange, min, max, step = 50000, fmt: fmtFn = (v) => v }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 180 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: "#6B7A99", letterSpacing: 0.8, textTransform: "uppercase" }}>{label}: <span style={{ color: ACCENT }}>{fmtFn(value)}</span></label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        style={{ accentColor: ACCENT, height: 4, width: "100%" }} />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#aaa" }}>
        <span>{fmtFn(min)}</span><span>{fmtFn(max)}</span>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#F0F5FC", minHeight: "100vh", paddingBottom: 40 }}>

      {/* ── HEADER */}
      <div style={{ background: NAVY, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 0" }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👥</div>
          <div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 800, letterSpacing: 0.3 }}>HR Analytics Dashboard</div>
            <div style={{ color: "#7AA7CC", fontSize: 11 }}>Human Resources — FY 2024–25</div>
          </div>
        </div>
        <div style={{ color: "#7AA7CC", fontSize: 12 }}>
          <span style={{ color: "#fff", fontWeight: 600 }}>{filtered.length}</span> of {employees.length} employees shown
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 24px 0" }}>

        {/* ── FILTERS PANEL */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", marginBottom: 24, boxShadow: "0 2px 10px rgba(26,46,74,0.07)", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-end" }}>
          <SectionTitle>🔍 Filters</SectionTitle>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-end", width: "100%" }}>
            {/* Search */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#6B7A99", letterSpacing: 0.8, textTransform: "uppercase" }}>Search</label>
              <input placeholder="Name or role…" value={search} onChange={(e) => setSearch(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #D0DFF0", fontSize: 13, color: NAVY, width: 180, outline: "none" }} />
            </div>
            <FilterSelect label="Department" value={dept} onChange={setDept} options={departments} />
            <FilterSelect label="Status"     value={status} onChange={setStatus} options={statuses} />
            <SliderFilter label="Min Salary" value={minSal} onChange={setMinSal} min={300000} max={1100000} step={50000} fmtFn={fmt} />
            <SliderFilter label="Max Salary" value={maxSal} onChange={setMaxSal} min={400000} max={1200000} step={50000} fmtFn={fmt} />
            <SliderFilter label="Min Rating" value={minRating} onChange={setMinRating} min={1} max={5} step={0.1} fmtFn={(v) => `${v}★`} />
            <button onClick={() => { setDept("All"); setStatus("All"); setMinSal(300000); setMaxSal(1200000); setMinRating(1); setSearch(""); }}
              style={{ padding: "8px 18px", borderRadius: 8, background: LIGHT, color: NAVY, border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", alignSelf: "flex-end", marginTop: 18 }}>
              Reset
            </button>
          </div>
        </div>

        {/* ── KPI CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
          <KPICard label="Total Employees" value={filtered.length}    sub={`${activeCount} active`}        color={NAVY}   icon="👥" />
          <KPICard label="Avg Salary"       value={fmt(avgSalary)}     sub="per annum"                      color={ACCENT} icon="💰" />
          <KPICard label="Avg Performance"  value={`${avgRating} ★`}   sub="out of 5.0"                     color={MID}    icon="⭐" />
          <KPICard label="Departments"       value={deptDist.length}    sub="active units"                   color="#3B9BD4" icon="🏢" />
          <KPICard label="On Leave"          value={filtered.filter(e=>e.status==="On Leave").length} sub="currently away" color="#F59E0B" icon="🏖️" />
          <KPICard label="Resigned (YTD)"    value={filtered.filter(e=>e.status==="Resigned").length} sub="attrition"     color="#EF4444" icon="📉" />
        </div>

        {/* ── CHARTS ROW 1 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginBottom: 18 }}>

          {/* Dept Distribution Pie */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "20px 18px", boxShadow: "0 2px 10px rgba(26,46,74,0.07)" }}>
            <SectionTitle>Dept. Distribution</SectionTitle>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={deptDist} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                  {deptDist.map((_, i) => <Cell key={i} fill={Object.values(DEPT_COLORS)[i % 6]} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${v} employees`]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Avg Salary by Dept */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "20px 18px", boxShadow: "0 2px 10px rgba(26,46,74,0.07)" }}>
            <SectionTitle>Avg Salary by Dept.</SectionTitle>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={salaryByDept} margin={{ top: 5, right: 10, left: 0, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAF2FB" />
                <XAxis dataKey="dept" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" />
                <YAxis tickFormatter={(v) => `₹${v/100000}L`} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v) => [fmt(v), "Avg Salary"]} />
                <Bar dataKey="avg" fill={ACCENT} radius={[6, 6, 0, 0]}>
                  {salaryByDept.map((_, i) => <Cell key={i} fill={Object.values(DEPT_COLORS)[i % 6]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gender */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "20px 18px", boxShadow: "0 2px 10px rgba(26,46,74,0.07)" }}>
            <SectionTitle>Gender Ratio</SectionTitle>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={genderDist} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}>
                  <Cell fill={NAVY} />
                  <Cell fill={MID} />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── CHARTS ROW 2 */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18, marginBottom: 18 }}>

          {/* Hiring Trend */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "20px 18px", boxShadow: "0 2px 10px rgba(26,46,74,0.07)" }}>
            <SectionTitle>Hiring vs. Attrition Trend (2024)</SectionTitle>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={hiringTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="hiredGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={ACCENT} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={ACCENT} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="resignGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#EF4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAF2FB" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="hired"   stroke={ACCENT}    fill="url(#hiredGrad)"  strokeWidth={2.5} name="Hired"   />
                <Area type="monotone" dataKey="resigned" stroke="#EF4444"  fill="url(#resignGrad)" strokeWidth={2.5} name="Resigned"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Attendance */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "20px 18px", boxShadow: "0 2px 10px rgba(26,46,74,0.07)" }}>
            <SectionTitle>Attendance (H1 2024)</SectionTitle>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={attendanceData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAF2FB" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis unit="%" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" name="Present" fill={NAVY}      radius={[4,4,0,0]} />
                <Bar dataKey="absent"  name="Absent"  fill="#EF4444"   radius={[4,4,0,0]} />
                <Bar dataKey="late"    name="Late"    fill="#F59E0B"   radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── EMPLOYEE TABLE */}
        <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 2px 10px rgba(26,46,74,0.07)", overflow: "hidden", marginBottom: 24 }}>
          <div style={{ padding: "18px 22px 0" }}>
            <SectionTitle>Employee Directory ({filtered.length} records)</SectionTitle>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  {[["id","ID"],["name","Name"],["dept","Department"],["role","Role"],["salary","Salary"],["age","Age"],["gender","Gender"],["status","Status"],["rating","Rating"],["location","Location"]].map(([col,label]) =>
                    <Th key={col} col={col} label={label} />
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={10} style={{ textAlign: "center", padding: 40, color: "#aaa" }}>No employees match the current filters.</td></tr>
                ) : filtered.map((e, i) => (
                  <tr key={e.id} style={{ background: i % 2 === 0 ? "#fff" : "#F7FAFF", borderBottom: "1px solid #EAF2FB", transition: "background 0.15s" }}
                    onMouseEnter={(ev) => ev.currentTarget.style.background = "#EAF2FB"}
                    onMouseLeave={(ev) => ev.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#F7FAFF"}>
                    <td style={{ padding: "10px 14px", color: "#6B7A99", fontWeight: 600 }}>{e.id}</td>
                    <td style={{ padding: "10px 14px", fontWeight: 600, color: NAVY }}>{e.name}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={{ background: (DEPT_COLORS[e.dept] || ACCENT) + "18", color: DEPT_COLORS[e.dept] || ACCENT, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>{e.dept}</span>
                    </td>
                    <td style={{ padding: "10px 14px", color: "#444" }}>{e.role}</td>
                    <td style={{ padding: "10px 14px", fontWeight: 600, color: ACCENT }}>{fmt(e.salary)}</td>
                    <td style={{ padding: "10px 14px" }}>{e.age}</td>
                    <td style={{ padding: "10px 14px" }}>{e.gender}</td>
                    <td style={{ padding: "10px 14px" }}>{statusBadge(e.status)}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={{ color: "#F59E0B", fontWeight: 700 }}>{"★".repeat(Math.round(e.rating))}</span>
                      <span style={{ color: "#aaa", marginLeft: 4, fontSize: 11 }}>{e.rating}</span>
                    </td>
                    <td style={{ padding: "10px 14px", color: "#6B7A99" }}>📍 {e.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── FOOTER */}
        <div style={{ textAlign: "center", color: "#aaa", fontSize: 11, paddingBottom: 10 }}>
          HR Analytics Dashboard · FY 2024–25 · Data for illustrative purposes only
        </div>
      </div>
    </div>
  );
}
