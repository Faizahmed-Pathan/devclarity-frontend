# DevClarity - Code Editor Frontend

A modern, VS Code-inspired web-based code editor built with vanilla HTML, CSS, and JavaScript. Features AI-powered code analysis, error detection, and intelligent suggestions.

## 🚀 Features

### Code Editor
- **Multi-file editing** with tabbed interface
- **Syntax highlighting** for JavaScript, JSX, TypeScript, and more
- **File explorer** with folder navigation
- **Line numbers** and cursor tracking
- **Auto-indentation** and smart formatting
- **Keyboard shortcuts** (Ctrl+S to save, Ctrl+Z/Y for undo/redo)

### AI-Powered Analysis
- **Real-time error detection** with severity levels
- **AI code suggestions** with confidence scores
- **Quick fix actions** for common issues
- **Performance optimization** recommendations
- **Code quality improvements**

### User Interface
- **Dark/Light theme** toggle
- **Responsive design** for desktop and mobile
- **Professional VS Code-style** interface
- **Smooth animations** and transitions
- **Collapsible sidebar** for more screen space

### Project Management
- **Dashboard** with project statistics
- **Recent activity** tracking
- **Project status** monitoring
- **Quick actions** for common tasks

## 🛠 Technology Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Font Awesome** - Icons and visual elements
- **Google Fonts** - Typography (Inter, JetBrains Mono)

## 📁 Project Structure

```
devclarity-frontend/
├── index.html              # Main editor page
├── login.html              # Authentication page
├── dashboard.html          # Project dashboard
├── styles/
│   └── main.css           # Main stylesheet
├── js/
│   ├── data.js            # Sample data and configurations
│   ├── fileManager.js     # File operations and tree management
│   ├── editor.js          # Code editor functionality
│   ├── panels.js          # Error analysis and suggestions
│   └── main.js            # App coordination and theme management
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Installation

1. **Clone or download** the project files
2. **Navigate** to the project directory
3. **Start a local server** (recommended):

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx http-server -p 8080

# Using PHP
php -S localhost:8080
```

4. **Open your browser** and go to `http://localhost:8080`

### Direct File Access
You can also open `index.html` directly in your browser, though some features may be limited due to CORS restrictions.

## 🎯 Usage

### Getting Started
1. **Login** - Start at `login.html` or go directly to the editor
2. **Dashboard** - View project statistics and recent activity
3. **Editor** - Create and edit code files with AI assistance

### Editor Features
- **File Management**: Use the sidebar to navigate and open files
- **Code Editing**: Click in the editor area to start typing
- **Error Analysis**: Check the right panel for code issues
- **AI Suggestions**: Review and apply intelligent code improvements
- **Theme Toggle**: Use the sun/moon icon to switch themes

### Keyboard Shortcuts
- `Ctrl+S` - Save current file
- `Ctrl+Z` - Undo
- `Ctrl+Y` - Redo
- `Ctrl+B` - Toggle sidebar
- `Ctrl+K` - Focus file search
- `Ctrl+P` - Command palette
- `Ctrl+\`` - Toggle theme
- `Tab` - Insert indentation
- `Enter` - Auto-indent new line

## 🎨 Customization

### Themes
The application supports both dark and light themes. Theme preference is automatically saved to localStorage.

### Colors
Modify CSS custom properties in `styles/main.css`:

```css
:root {
  --accent-color: #0d6efd;
  --success-color: #198754;
  --warning-color: #fd7e14;
  --error-color: #dc3545;
  /* ... more variables */
}
```

### File Icons
Add new file type icons in `js/data.js`:

```javascript
fileIcons: {
  'python': 'fab fa-python',
  'java': 'fab fa-java',
  'php': 'fab fa-php',
  // Add more as needed
}
```

## 🔧 Configuration

### Sample Data
Modify `js/data.js` to customize:
- File structure and sample files
- Error messages and suggestions
- Code snippets and examples

### Editor Settings
Adjust editor behavior in `js/editor.js`:
- Syntax highlighting rules
- Auto-indentation logic
- Keyboard shortcuts

## 🌟 Features in Detail

### File Management
- **Tree View**: Hierarchical file and folder display
- **Search**: Filter files by name
- **Tabs**: Multiple open files with close buttons
- **Context**: File type detection and appropriate icons

### Code Analysis
- **Error Detection**: Syntax errors, missing imports, unused variables
- **Suggestions**: Performance optimizations, best practices, refactoring
- **Quick Fixes**: One-click solutions for common issues
- **Filtering**: Sort by priority, confidence, or category

### Responsive Design
- **Mobile-first**: Optimized for touch devices
- **Adaptive Layout**: Sidebar collapses on smaller screens
- **Touch-friendly**: Large tap targets and smooth scrolling

## 🚀 Performance

- **Lightweight**: No heavy frameworks or dependencies
- **Fast Loading**: Minimal JavaScript and CSS
- **Efficient**: Smart rendering and event handling
- **Cached**: Browser caching for static assets

## 🔒 Security

- **No Server**: Runs entirely in the browser
- **Local Storage**: Preferences saved locally
- **No Data Collection**: Privacy-focused design
- **HTTPS Ready**: Works with secure connections

## 🤝 Contributing

This is a demonstration project showcasing vanilla web technologies. Feel free to:

1. **Fork** the project
2. **Add features** or improvements
3. **Fix bugs** or issues
4. **Submit pull requests**

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **VS Code** - UI/UX inspiration
- **Font Awesome** - Icon library
- **Google Fonts** - Typography
- **Modern CSS** - Layout and styling techniques

## 📞 Support

For questions or issues:
- Check the browser console for error messages
- Ensure you're using a modern browser
- Try refreshing the page or clearing browser cache
- Use a local server for full functionality

---

**DevClarity** - Making code clearer, one suggestion at a time. ✨
