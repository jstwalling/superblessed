import Link from "next/link";

const footerLinks = {
  About: [
    { label: "Our Story", href: "/about" },
    { label: "Mission", href: "/mission" },
    { label: "Team", href: "/team" },
    { label: "Contact Us", href: "/contact" },
  ],
  Resources: [
    { label: "Daily Devotionals", href: "/devotionals" },
    { label: "Prayer Guides", href: "/guides" },
    { label: "Bible Study", href: "/bible-study" },
    { label: "Testimonials", href: "/testimonials" },
  ],
  Community: [
    { label: "Prayer Requests", href: "/requests" },
    { label: "Groups", href: "/groups" },
    { label: "Events", href: "/events" },
    { label: "Volunteer", href: "/volunteer" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted/50">
      {/* Orange Banner */}
      <div className="bg-primary text-primary-foreground rounded-xl mx-4 lg:mx-8 p-8 -mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">SuperBlessed</h3>
            <p className="text-primary-foreground/80">
              Spreading love, faith, and positivity
            </p>
          </div>
          <div className="flex gap-4">
            {/* Social icons - placeholder circles */}
            {["facebook", "twitter", "instagram", "youtube"].map((social) => (
              <Link
                key={social}
                href={`https://${social}.com`}
                className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <span className="sr-only">{social}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="bg-background pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-bold mb-4">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>Made with love by SuperBlessed</p>
            <p className="text-sm mt-1">
              &copy; {new Date().getFullYear()} SuperBlessed. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
