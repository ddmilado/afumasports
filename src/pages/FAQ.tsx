
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How do I know if a part will fit my vehicle?",
    answer: "Each product page includes detailed compatibility information. You can also use our vehicle lookup tool or contact our support team with your vehicle's VIN number for accurate fitment verification."
  },
  {
    id: 2,
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy on most items. Parts must be in original condition and packaging. Some electrical items and special orders may have different return terms."
  },
  {
    id: 3,
    question: "Do you offer free shipping?",
    answer: "Yes! We offer free standard shipping on orders over $150. Express and overnight shipping options are available for additional fees."
  },
  {
    id: 4,
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 5-7 business days. Express shipping (2-3 days) and overnight shipping options are available at checkout."
  },
  {
    id: 5,
    question: "Are your parts covered by warranty?",
    answer: "Most parts come with manufacturer warranties ranging from 1-3 years. Warranty terms are listed on each product page and vary by manufacturer."
  },
  {
    id: 6,
    question: "Can I install the parts myself?",
    answer: "Many parts can be installed by experienced DIYers. However, we recommend professional installation for complex components like transmissions or engine internals."
  },
  {
    id: 7,
    question: "Do you have a physical store?",
    answer: "We primarily operate online, but we do have a warehouse facility in Detroit, MI. Contact us to schedule a pickup appointment."
  },
  {
    id: 8,
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can also track orders through your account dashboard."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our products and services
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  {openItems.includes(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openItems.includes(faq.id) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to help you find the right parts for your vehicle.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>


    </div>
  );
};

export default FAQ;
