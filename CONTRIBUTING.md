# Contributing to Default Creds

First off, thank you for considering contributing to **Default Creds**! By organizing credentials by manufacturer, we create a cleaner, more navigable database for security researchers.

## How to Contribute

1. **Fork** the repository.
2. Create a **new branch** for your addition (`git checkout -b add-[manufacturer-name]`).
3. Add or update the YAML file in the `src/data/` directory.
4. **Validate** your YAML structure (see the schema below).
5. Commit your changes and **open a Pull Request**.

## YAML Schema Guide

To keep the database consistent, we use a **Manufacturer-First** approach. Each file represents a single brand/manufacturer.

### File Naming

- Use the manufacturer's name in lowercase with hyphens: `cisco.yaml`, `tp-link.yaml`.
- Extension must be `.yaml`.

### Template

If the manufacturer file doesn't exist, create it in `src/data/`. If it exists, simply add your product to the `entries` list.

```yaml
name: "Manufacturer Name" # Full name of the brand
icon: "brand-slug" # Optional: Simple icons (see https://simpleicons.org/)
tags: # Keywords for search
  - "web"
  - "database"
  - "iot"
entries:
  - name: "Product Model Name" # Full name of the specific device/service
    version: "all" # Optional: Specific firmware version or "all"
    user: "admin" # Default username
    pass: "admin123" # Default password
    comment: "Initial setup credentials via Web UI"
  - name: "Other Product Model"
    version: "2.0+" # + or - indication if needed
    user: "root"
    pass: "toor"
    comment: "Changed in newer firmware revisions"
```

## Rules to Follow

1. **Manufacturer Grouping:** Do not create a new file for every device. Check if the manufacturer's file already exists and append your entry there.
2. **Product Specificity:** Ensure the `name` field inside `entries` clearly identifies the model (e.g., `WRT54G` instead of just `Router`).
3. **Escape Special Characters:** If a password contains symbols like `#`, `@`, or starts with a dash, wrap it in double quotes: `pass: "@dmin#123"`.
4. **Icons:** We use [Simple Icons](https://simpleicons.org/). Use the "slug" found in their URL (e.g., `d-link` for D-Link).

## Code of Conduct

By contributing, you agree to keep this repository a professional and ethical resource. Any malicious, fake, or non-default data will be rejected during the PR review.
