import "dotenv/config";
import mongoose from "mongoose";
import Service from "../models/Service.js";
import Professional from "../models/Professional.js";
import Review from "../models/Review.js";

const image = (id) => id.startsWith("http")
  ? id
  : `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;
const services = [
  ["s1","ac-repair","AC Repair","Wind",399,"Expert AC servicing, gas refill, and complete repairs for all brands.",true,"5822936"],
  ["s2","electrician","Electrician","Zap",199,"Licensed electricians for wiring, repairs, installations, and safety checks.",true,"https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=85"],
  ["s3","plumbing","Plumbing","Wrench",249,"Professional plumbing services for leaks, installations, and repairs.",true,"https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=85"],
  ["s4","home-cleaning","Home Cleaning","Sparkles",499,"Deep cleaning, regular cleaning, and specialized cleaning services.",true,"4108715"],
  ["s5","carpentry","Carpentry","Hammer",299,"Custom furniture repair, assembly, and woodworking services.",false,"5974345"],
  ["s6","painting","Painting","PaintRoller",599,"Interior and exterior painting with premium quality paints.",false,"6474450"],
  ["s7","appliance-repair","Appliance Repair","Refrigerator",349,"Repair services for refrigerators, washing machines, microwaves, and more.",true,"3998001"],
  ["s8","salon","Salon at Home","Scissors",299,"Professional salon services in the comfort of your home.",true,"3993449"],
].map(([id,slug,name,icon,startingPrice,shortDescription,popular,imageId]) => ({
  id,slug,name,category:slug,icon,startingPrice,shortDescription,popular,image:image(imageId),
  description:shortDescription, rating:4.7, reviewCount:100, bookedCount:500,
  whatsIncluded:["Professional service","Diagnostic check","Quality materials"], whatsNotIncluded:[],
  faqs:[],
}));
const professionals = [
  ["p1","Rahul Sharma","Electrician","rahul",4.9,8,"Pune"],
  ["p2","Priya Patel","Salon Professional","priya",4.9,6,"Mumbai"],
  ["p3","Amit Kumar","AC Repair Technician","amit",4.8,7,"Pune"],
  ["p4","Sneha Reddy","Cleaning Professional","sneha",4.8,5,"Pune"],
  ["p5","Anjali Gupta","Tutor","anjali",5,4,"Mumbai"],
  ["p6","Vikram Singh","Plumber","vikram",4.7,10,"Delhi"],
  ["p7","Neha Joshi","Interior Painter","neha",4.8,6,"Bangalore"],
  ["p8","Rakesh Verma","Carpenter","rakesh",4.7,9,"Pune"],
  ["p9","Meera Iyer","Fitness Trainer","meera",4.9,7,"Mumbai"],
  ["p10","Arjun Malhotra","Photographer","arjun",4.8,5,"Delhi"],
].map(([id,name,profession,seed,rating,experience,location]) => ({
  id,name,profession,avatar:`https://i.pravatar.cc/300?u=${seed}`,rating,experience,location,
  reviewCount:100,completedJobs:500,startingPrice:299,verified:true,online:true,bio:`Experienced ${profession}.`,
  skills:[],services:[],availability:[],portfolio:[],
}));
const reviews = [
  ["Kavya Nair",5,"Absolutely amazing service!","Electrician","Rahul Sharma"],
  ["Rohan Mehta",5,"Every corner was spotless. Will definitely use again!","Home Cleaning","Sneha Reddy"],
  ["Divya Krishnan",4,"The salon at home service was so convenient.","Salon at Home","Priya Patel"],
].map(([author,rating,text,serviceUsed,professionalName]) => ({
  author,rating,text,serviceUsed,professionalName,avatar:`https://i.pravatar.cc/300?u=${author}`,
}));

try {
  await mongoose.connect(process.env.MONGODB_URI);
  await Promise.all([Service.deleteMany({}), Professional.deleteMany({}), Review.deleteMany({})]);
  await Service.insertMany(services); await Professional.insertMany(professionals); await Review.insertMany(reviews);
  console.log("Seed data inserted."); await mongoose.disconnect();
} catch (error) { console.error("Seed failed:", error.message); process.exitCode = 1; }
