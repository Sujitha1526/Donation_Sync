const BASE_URL = "http://localhost:5000/api";

// 🔑 Auto token
const getToken = () => localStorage.getItem("token");

// ---------------- AUTH ----------------

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// ---------------- DONATIONS ----------------

export const createDonation = async (data) => {
  const res = await fetch(`${BASE_URL}/donations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getDonations = async (status) => {
  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  const res = await fetch(`${BASE_URL}/donations${query}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};

export const getDonationsByRole = async (role, status) => {
  const queryParts = [];
  if (status) queryParts.push(`status=${encodeURIComponent(status)}`);
  const query = queryParts.length ? `?${queryParts.join('&')}` : '';
  const res = await fetch(`${BASE_URL}/donations${query}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};

export const requestDonation = async (id) => {
  const res = await fetch(`${BASE_URL}/donations/${id}/request`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};

export const acceptDonation = async (id, orgId) => {
  const res = await fetch(`${BASE_URL}/donations/${id}/accept`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ organizationId: orgId }),
  });
  return res.json();
};

export const contributeDonation = async (id) => {
  const res = await fetch(`${BASE_URL}/donations/${id}/contribute`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};

export const completeDonation = async (id) => {
  const res = await fetch(`${BASE_URL}/donations/${id}/complete`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};

// ---------------- ADMIN APIs ----------------

// ✅ Stats
export const getStats = async () => {
  const res = await fetch(`${BASE_URL}/admin/stats`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};

// ✅ Top donors
export const getTopDonors = async () => {
  const res = await fetch(`${BASE_URL}/admin/top-donors`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};

// ✅ Top volunteers
export const getTopVolunteers = async () => {
  const res = await fetch(`${BASE_URL}/admin/top-volunteers`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};
export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};

export const getUser = async (id) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};

// ✅ Category stats (for pie chart)
export const getCategoryStats = async () => {
  const res = await fetch(`${BASE_URL}/admin/categories`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};

// ✅ Activity feed
export const getActivity = async () => {
  const res = await fetch(`${BASE_URL}/admin/activity`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
};