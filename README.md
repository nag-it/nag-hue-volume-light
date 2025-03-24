# 🚦 Nag Hue Volume Light

A React-based web application to control volume-related notifications using Philips Hue lights via IFTTT triggers.

## Features

- **Volume Notifications**: Trigger different volume levels (e.g., "Too Loud", "Really Too Loud", "Fine") using buttons.
- **IFTTT Integration**: Sends requests to IFTTT webhooks to trigger Philips Hue light scenes.
---

## Use Case

In a shared office environment, noise levels can sometimes become disruptive. This app allows employees to use Philips Hue lights (via IFTTT) to visually signal the current noise level to their colleagues:

- **Red Light**: "Really Too Loud!" – Indicates that the noise level is unacceptable and needs immediate attention.
- **Yellow Light**: "Too Loud!" – A warning that the noise level is becoming disruptive.
- **Green Light**: "Fine" – Indicates that the noise level is acceptable.

This system helps maintain a productive and respectful office atmosphere.

---

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your system.
- **Yarn**: Install Yarn for dependency management.

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nag-hue-volume-light.git
   cd nag-hue-volume-light
   