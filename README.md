# 🐸 WGMI Solana Telegram Bot

A Telegram bot for the $WGMI community that provides oracle prophecies, wallet management, and crypto memes!

## Features

- 🔮 **Oracle Prophecies** - Get random WAGMI predictions
- 💰 **Wallet Management** - Register and manage Solana wallets
- 🎲 **Prayer System** - 10% chance for Oracle blessings
- 😂 **Meme Generator** - Random crypto memes
- 👑 **Admin Tools** - Export user wallets for airdrops
- 🔗 **Solana Integration** - Built with Solana Web3.js

## Setup

### Prerequisites

- Node.js 18.x or higher
- A Telegram Bot Token (get from [@BotFather](https://t.me/botfather))
- Optional: Solana wallet for advanced features

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd wgmi-bot
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
TELEGRAM_TOKEN=your_telegram_bot_token_here
WGMI_ADMINS=123456789,987654321
SOLANA_SECRET=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64]
```

### Running the Bot

```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

## Commands

- `/start` - Show welcome message and available commands
- `/wgmi` - Get a random oracle prophecy
- `/wallet <address>` - Register your Solana wallet address
- `/mywallet` - View your registered wallet
- `/pray` - Ask the Oracle for a blessing (10% success rate)
- `/meme` - Get a random crypto meme
- `/export_airdrop` - (Admin only) Export all registered wallets

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `TELEGRAM_TOKEN` | Yes | Your Telegram Bot API token |
| `WGMI_ADMINS` | No | Comma-separated list of admin user IDs |
| `SOLANA_SECRET` | No | Solana wallet secret key (64-byte array) |
| `SOLANA_RPC_URL` | No | Custom Solana RPC endpoint (default: mainnet-beta) |

### Getting Admin User IDs

1. Start a conversation with your bot
2. Send any message
3. Check the bot logs to see your user ID
4. Add it to the `WGMI_ADMINS` environment variable

## Development

### Project Structure

```
wgmi-bot/
├── bot.js              # Main bot file
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

### Adding New Features

1. Add new command handlers in `bot.js`
2. Update the `/start` command help text
3. Test with your bot
4. Update this README if needed

## Security Notes

- Never commit your `.env` file
- Keep your `SOLANA_SECRET` secure
- Only add trusted users as admins
- The bot stores wallet addresses in memory (lost on restart)

## Troubleshooting

### Common Issues

1. **Bot not responding**: Check your `TELEGRAM_TOKEN`
2. **Invalid Solana address**: Ensure addresses are 32-44 characters, base58 encoded
3. **Admin commands not working**: Verify user IDs in `WGMI_ADMINS`

### Logs

The bot provides detailed logging:
- ✅ Successful operations
- ❌ Errors and warnings
- 📊 Connection status
- 👥 Admin configuration

## License

ISC License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**WAGMI!** 🚀💎
