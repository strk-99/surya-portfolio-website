# Apps Directory Architecture

This directory is the container for all future dynamic applications, tools, and demos hosted on `suryalearningdevops.online`.

## Structure

```
/apps
  ├── index.html        # The dashboard listing all available apps
  ├── README.md         # This documentation
  ├── app-template/     # A clean starting point for new apps
  └── <app-name>/       # Independent application directory
```

## How to Add a New App

1. **Create Directory**: Create a new folder under `apps/` (e.g., `apps/monitor-dashboard`).
2. **Develop**: Build your app inside this folder.
   - It **MUST** have an `index.html` as its entry point.
   - It can have its own `style.css`, scripts, or even a compiled React build dropped here.
   - All paths in your app should be relative (`./style.css`) or absolute to the app root (`/apps/monitor-dashboard/style.css`), NOT root relative (`/style.css`) unless using shared assets.
3. **Register**: Add a link card to `apps/index.html` manually (initially) or via script if implemented.
4. **Deploy**: The build process maps `apps/<app-name>/index.html` to `suryalearningdevops.online/apps/<app-name>/`.

## Rules
- **Independence**: Changing an app should never break the root site.
- **No Shared State**: Apps should not rely on global root site state (Redux/Context) unless explicitly designed as a shared library.
- **Container Mode**: The `/apps` index page acts as a portal.
