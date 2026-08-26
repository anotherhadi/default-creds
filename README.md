<div align="center">
    <img alt="logo" src="https://github.com/anotherhadi/default-creds-web/raw/main/public/logo.svg" width="120px" />
</div>

<br>

# Default-Creds

**Default Creds** is a centralized, community-driven database of factory-set credentials, stored as plain YAML files. Designed for pentesters and security researchers, it helps identify weak access points during engagement phases or audit internal infrastructure before they become a security liability.

**Live Instance:** [default-creds.hadi.icu](https://default-creds.hadi.icu?utm_source=github&utm_medium=readme)

**API Documentation:** [default-creds.hadi.icu/api-docs](https://default-creds.hadi.icu/api-docs?utm_source=github&utm_medium=readme)

This repo contains **only the data**. It's a flat-file database: one YAML file per manufacturer in [`data/`](./data).

The website and API are built and hosted from a separate repo, **[anotherhadi/default-creds-web](https://github.com/anotherhadi/default-creds-web)**.

There is also a TUI to search for default credentials: [default-creds-tui](https://github.com/anotherhadi/default-creds-tui).

## The Mission

In the world of cybersecurity, "low-hanging fruit" often comes in the form of unchanged default passwords. Our mission is to provide a fast, reliable, and searchable database of these credentials to help security professionals secure systems before attackers exploit them.

## Community Driven & Contributing

Security is a collective effort. This project only grows as the community discovers and adds new default configurations.

- **Want to add an app?** Just create a new YAML file in `data/`.
- **Found a mistake?** Submit a Pull Request to update existing entries.

Before contributing, please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to format your YAML files.

## ⚠️ Legal Disclaimer

Usage of **Default Creds** for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state, and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program.

---

<div align="center">
  <a href="https://github.com/anotherhadi/default-creds">github</a> |
  <a href="https://gitlab.com/anotherhadi_mirror/default-creds">gitlab (mirror)</a> |
  <a href="https://git.hadi.icu/anotherhadi/default-creds">gitea (mirror)</a>
</div>
