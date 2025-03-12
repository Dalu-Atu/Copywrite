import Image from "next/image";

const testimonials = [
  {
    img: "/images/testimonial-woman-1.jpeg",
    name: "Irene Strong",
    text: "I can't believe how accurate the handwriting-to-text conversion is! It saves me hours of typing.",
  },
  {
    img: "/images/testimonial-man.jpeg",
    name: "Jonas Kakaroto",
    text: "Finally, a tool that lets me scan, convert, edit, and save my notes in one place. No more juggling multiple apps!",
  },
  {
    img: "/images/testimonial-woman-2.jpeg",
    name: "Sophie Laurent",
    text: "I love how I can scan my notes, convert them to text, edit, and save everything in the cloud. So convenient!",
  },
];

const TestimonialSection = () => {
  return (
    <section
      id="testimonials"
      className="py-16 px-4 text-center bg-[#f9f9f9] md:px-8"
    >
      <h2 className="text-2xl font-bold leading-snug text-[#00415a] sm:text-3xl md:text-4xl px-2">
        What Our Users Say
      </h2>
      <p className="text-xl text-[#666] mb-10 max-w-[600px] mx-auto">
        See what our customers have to say about their experience with us.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-[1200px] mx-auto text-center">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-3xl shadow-lg max-w-[400px] text-left transition-transform border border-[#00415a] hover:-translate-y-2"
          >
            <Image
              src={testimonial.img}
              alt={testimonial.name}
              width={64} // 16 * 4 (pixels per rem)
              height={64} // 16 * 4 (pixels per rem)
              className="rounded-full mb-4"
            />
            <h4 className="text-xl text-[#00415a] mb-2">{testimonial.name}</h4>
            <p className="text-base text-[#555]">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
