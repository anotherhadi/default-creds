<div align="center">
    <img alt="logo" src="https://raw.githubusercontent.com/anotherhadi/default-creds/main/public/logo.svg" width="120px" />
</div>

<br>

# Default-Creds

<br>
<div align="center">
    <a href="https://github.com/anotherhadi/default-creds/stargazers">
        <img src="https://img.shields.io/github/stars/anotherhadi/default-creds?color=8FD0CB&labelColor=0b0b0b&style=for-the-badge&logo=starship&logoColor=8FD0CB">
    </a>
    <a href="https://github.com/anotherhadi/default-creds/">
        <img src="https://img.shields.io/github/repo-size/anotherhadi/default-creds?color=8FD0CB&labelColor=0b0b0b&style=for-the-badge&logo=github&logoColor=8FD0CB">
    </a>
    <a href="https://github.com/anotherhadi/default-creds/tree/main/src/data">
        <img src="https://img.shields.io/badge/dynamic/json?url=https://api.github.com/repos/anotherhadi/default-creds/contents/src/data&query=%24.length&label=Manufacturers&style=for-the-badge&color=8FD0CB&labelColor=0b0b0b&logo=github&logoColor=8FD0CB">
    </a>
    <a href="https://github.com/anotherhadi/default-creds/blob/main/LICENSE">
        <img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=MIT&colorA=0b0b0b&colorB=8FD0CB&logo=unlicense&logoColor=8FD0CB"/>
    </a>
</div>
<br>

**Default Creds** is a centralized, community-driven repository of factory-set credentials. Designed for pentesters and security researchers, it helps identify weak access points during engagement phases or audit internal infrastructure before they become a security liability.

**Live Instance:** [default-creds.hadi.icu](https://default-creds.hadi.icu?utm_source=github&utm_medium=readme)

**API Documentation:** [default-creds.hadi.icu/api-docs](https://default-creds.hadi.icu/api-docs?utm_source=github&utm_medium=readme)

## 🎯 The Mission

In the world of cybersecurity, "low-hanging fruit" often comes in the form of unchanged default passwords. Our mission is to provide a fast, reliable, and searchable database of these credentials to help security professionals secure systems before attackers exploit them.

## ⚙️ How it Works

This application is built with **Astro** and **Svelte 5** for maximum performance. It operates as a "Flat-File Database":

1. **YAML Powered:** All credentials are stored as structured `.yaml` files in the `src/data/` directory.
2. **Real-time Search:** The API parses these files on-the-fly (or via build cache) to provide instant results based on service names, versions, or tags.
3. **Developer Friendly:** A public API is available to integrate these credentials into your own automated scanning tools.

## 🤝 Community Driven & Contributing

Security is a collective effort. This project only grows as the community discovers and adds new default configurations.

- **Want to add an app?** Just create a new YAML file in `src/data/`.
- **Found a mistake?** Submit a Pull Request to update existing entries.

Before contributing, please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to format your YAML files.

## 💻 Local Development

### Prerequisites

- Bun (or nix, just `nix develop`)

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

### 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **UI Logic:** [Svelte 5 (Runes)](https://svelte.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)

## ⚠️ Legal Disclaimer

Usage of **Default Creds** for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state, and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program.
