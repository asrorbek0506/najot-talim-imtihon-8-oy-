import { Icon } from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import { useTestimonials } from "../../hooks/api/usePublicContent";

const Testimonials = () => {
  const { data, isLoading } = useTestimonials(6);
  const testimonials = data ?? [];

  return (
    <section className="bg-gray-50/70 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Sharhlar"
          title="Talabalarimiz fikri"
          subtitle="Bitiruvchilarimiz o'z fikrini bildirdi. Mana, ulardan ba'zilari."
        />

        {isLoading ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl bg-white" />
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <p className="mt-12 text-center text-sm text-gray-500">
            Hozircha tasdiqlangan sharhlar mavjud emas.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <figure
                key={index}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <span className="text-4xl leading-none text-blue-200">"</span>
                <div className="mt-2 flex gap-x-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Icon.star key={i} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm italic leading-relaxed text-gray-600">
                  {item.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-3 border-t border-gray-100 pt-4">
                  <img
                    src={item.avatarUrl || "https://i.pravatar.cc/100"}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    {item.course && (
                      <p className="text-xs text-gray-500">{item.course.name}</p>
                    )}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
