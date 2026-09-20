import Service from "../models/Service.js";

// ======================================================
// CATEGORY NORMALIZER
// ======================================================
function normalizeCategory(category) {
  if (!category) return "";

  return String(category)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

// ======================================================
// GET ALL SERVICES
// ======================================================
export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({})
      .sort({ popular: -1, name: 1 })
      .lean();

    // If category is selected, filter after normalizing
    const selectedCategory = normalizeCategory(req.query.category);

    let filteredServices = services;

    if (selectedCategory) {
      filteredServices = services.filter((service) => {
        return (
          normalizeCategory(service.category) === selectedCategory
        );
      });
    }

    console.log("=================================");
    console.log("SELECTED CATEGORY:", selectedCategory);
    console.log("TOTAL SERVICES:", services.length);
    console.log("FILTERED SERVICES:", filteredServices.length);
    console.log("=================================");

    res.json({
      success: true,
      services: filteredServices,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GET SINGLE SERVICE
// ======================================================
export const getService = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    const service = await Service.findOne({
      $or: [
        { slug: slug },
        { id: slug },
      ],
    }).lean();

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};