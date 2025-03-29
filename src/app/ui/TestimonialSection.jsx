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
    // <section
    //   id="testimonials"
    //   className="py-16 px-4 text-center bg-[#f9f9f9] md:px-8"
    // >
    //   <h2 className="text-2xl font-bold leading-snug text-[#00415a] sm:text-3xl md:text-4xl px-2">
    //     What Our Users Say
    //   </h2>
    //   <p className="text-xl text-[#666] mb-10 max-w-[600px] mx-auto">
    //     See what our customers have to say about their experience with us.
    //   </p>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-[1200px] mx-auto text-center">
    //     {testimonials.map((testimonial, index) => (
    //       <div
    //         key={index}
    //         className="bg-white p-4 rounded-3xl shadow-lg max-w-[400px] text-left transition-transform border border-[#00415a] hover:-translate-y-2"
    //       >
    //         <Image
    //           src={testimonial.img}
    //           alt={testimonial.name}
    //           title={testimonial.name}
    //           width={64} // 16 * 4 (pixels per rem)
    //           height={64} // 16 * 4 (pixels per rem)
    //           className="rounded-full mb-4"
    //           loading="lazy"
    //         />
    //         <h4 className="text-xl text-[#00415a] mb-2">{testimonial.name}</h4>
    //         <p className="text-base text-[#555]">{testimonial.text}</p>
    //       </div>
    //     ))}
    //   </div>
    // </section>
    <section className="py-16 bg-gray-50">
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
