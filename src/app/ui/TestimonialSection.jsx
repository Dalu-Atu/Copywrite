import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Thompson",
    role: "Marketing Director",
    company: "GlobalTech Solutions",
    quote:
      "Copywrite has revolutionized how our team manages documentation. What used to take hours now takes minutes!",
    avatar: "/images/testimonial-woman-1.jpeg",
  },
  {
    name: "Dr. Michael Chen",
    role: "Research Scientist",
    company: "BioInnovate Labs",
    quote:
      "As a researcher, my handwritten notes are my most valuable asset. Copywrite ensures not a single insight is lost.",
    avatar: "/images/testimonial-man.jpeg",
  },
  {
    name: "Mia Rodriguez",
    role: "Legal Consultant",
    company: "Rodriguez Law Group",
    quote:
      "The accuracy and preservation of formatting in legal documents is crucial. Copywrite exceeds our expectations.",
    avatar: "/images/testimonial-woman-2.jpeg",
  },
];
const TestimonialSection = () => {
  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <span className="inline-block px-3 py-1 bg-blue-100 text-[#015979] rounded-full text-sm font-semibold mb-4">
            TRUSTED BY PROFESSIONALS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600">
            Real stories from professionals who have transformed their workflow
            with Copywrite.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 transform transition-all hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="italic text-gray-700 mb-4">"{testimonial.quote}"</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
