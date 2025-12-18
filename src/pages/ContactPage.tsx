import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin,
  ChevronDown,
  Send
} from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@buildfuturetalent.co.uk",
    href: "mailto:hello@buildfuturetalent.co.uk",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+44 (0) 20 1234 5678",
    href: "tel:+442012345678",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Construction House, London, EC1A 1BB",
    href: "#",
  },
];

const faqs = [
  {
    question: "How much does it cost for candidates?",
    answer: "Our service is completely free for candidates. We're funded by employers who pay us when they successfully hire through our platform.",
  },
  {
    question: "What qualifications do I need?",
    answer: "We work with candidates at all stages — from school leavers with GCSEs to university graduates. Different roles have different requirements, and we help match you with suitable opportunities.",
  },
  {
    question: "How long does the recruitment process take?",
    answer: "This varies depending on the role and employer. Typically, from registration to placement can take 2-8 weeks. We keep you informed throughout the process.",
  },
  {
    question: "Do you work with employers outside the UK?",
    answer: "Yes, while most of our placements are UK-based, we also work with international construction companies looking for talent.",
  },
  {
    question: "What support do you provide after placement?",
    answer: "We offer ongoing support for the first 6 months of your employment, including check-ins and access to our resources. For retained employer partnerships, we provide continuous support.",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-20 gradient-hero border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get in <span className="text-gradient-primary">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our services? We'd love to hear from you. 
              Reach out and our team will get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="p-8 rounded-xl bg-card border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full h-12 px-4 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full h-12 px-4 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full h-12 px-4 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    I am a...
                  </label>
                  <select
                    className="w-full h-12 px-4 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select an option</option>
                    <option value="candidate">Candidate</option>
                    <option value="employer">Employer</option>
                    <option value="school">School/College</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <Button variant="cta-primary" size="lg" className="w-full">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info & FAQs */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="p-8 rounded-xl bg-card border border-border">
                <h2 className="text-xl font-bold text-foreground mb-6">Contact Details</h2>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      className="flex items-start gap-4 group"
                    >
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{info.label}</div>
                        <div className="text-foreground group-hover:text-primary transition-colors">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="p-8 rounded-xl bg-card border border-border">
                <h2 className="text-xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <span className="font-medium text-foreground pr-4">{faq.question}</span>
                        <ChevronDown
                          className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${
                            openFaq === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openFaq === index && (
                        <p className="mt-3 text-sm text-muted-foreground animate-fade-in">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
