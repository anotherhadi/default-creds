# Default Creds

**Default Creds** is a centralized, community-driven repository of factory-set credentials. Designed for pentesters and security researchers, it helps identify weak access points during engagement phases or audit internal infrastructure before they become a security liability.

**Live Instance:** [default-creds.hadi.diy](https://default-creds.hadi.diy)

## The Mission

In the world of cybersecurity, "low-hanging fruit" often comes in the form of unchanged default passwords. Our mission is to provide a fast, reliable, and searchable database of these credentials to help security professionals secure systems before attackers exploit them.

## How it Works

This application is built with **Astro** and **Svelte 5** for maximum performance. It operates as a "Flat-File Database":

1. **YAML Powered:** All credentials are stored as structured `.yaml` files in the `src/data/` directory.
2. **Real-time Search:** The API parses these files on-the-fly (or via build cache) to provide instant results based on service names, versions, or tags.
3. **Developer Friendly:** A public API is available to integrate these credentials into your own automated scanning tools.

## Community Driven & Contributing

Security is a collective effort. This project only grows as the community discovers and adds new default configurations.

- **Want to add an app?** Just create a new YAML file in `src/data/`.
- **Found a mistake?** Submit a Pull Request to update existing entries.

Before contributing, please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to format your YAML files.

## Local Development

### Prerequisites

- Bun

### Installation

1. **Clone the repo:**

```bash
git clone https://github.com/anotherhadi/default-creds.git
cd default-creds

```

2. **Start the dev server:**

```bash
bun dev
```

3. **Add your data:**
   Drop a `.yaml` file into `src/data/` and it will appear in the search results instantly!

## Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **UI Logic:** [Svelte 5 (Runes)](https://svelte.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)

## Legal Disclaimer

Usage of **Default Creds** for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state, and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program.
