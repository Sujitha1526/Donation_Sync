import User from '../models/User.js';
import Donation from '../models/Donation.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const donationsCount = await Donation.countDocuments();

    const donorsCount = await User.countDocuments({ role: 'donor' });
    const organizationsCount = await User.countDocuments({ role: 'organization' });
    const volunteersCount = await User.countDocuments({ role: 'volunteer' });

    const statusGroups = await Donation.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $project: { status: '$_id', count: 1, _id: 0 } },
    ]);

    const categoryGroups = await Donation.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { category: '$_id', count: 1, _id: 0 } },
    ]);

    const statusObject = {
      pending: 0,
      requested: 0,
      accepted: 0,
      'in-progress': 0,
      completed: 0,
    };
    statusGroups.forEach((c) => {
      statusObject[c.status] = c.count;
    });

    const categoryObject = {
      food: 0,
      clothes: 0,
      books: 0,
    };
    categoryGroups.forEach((c) => {
      if (categoryObject[c.category] !== undefined) categoryObject[c.category] = c.count;
    });

    res.json({
      totalUsers,
      totalDonations: donationsCount,
      completedDonations: statusObject.completed || 0,
      pendingDonations: statusObject.pending || 0,
      requestedDonations: statusObject.requested || 0,
      acceptedDonations: statusObject.accepted || 0,
      inProgressDonations: statusObject['in-progress'] || 0,
      donorsCount,
      organizationsCount,
      volunteersCount,
      donationStatusCounts: statusObject,
      categoryStats: categoryObject,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopDonors = async (req, res) => {
  try {
    const topDonors = await User.find({ role: 'donor' })
      .sort({ donationCount: -1 })
      .limit(10)
      .select('name email donationCount level');

    res.json(topDonors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopVolunteers = async (req, res) => {
  try {
    const topVolunteers = await User.find({ role: 'volunteer' })
      .sort({ contributionCount: -1 })
      .limit(10)
      .select('name email contributionCount level');

    res.json(topVolunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryStats = async (req, res) => {
  try {
    const categoryStats = await Donation.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { category: '$_id', count: 1, _id: 0 } },
    ]);

    res.json(categoryStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const recentDonations = await Donation.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('donorId', 'name email')
      .populate('assignedOrganization', 'name email')
      .populate('assignedVolunteer', 'name email');

    res.json(recentDonations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};