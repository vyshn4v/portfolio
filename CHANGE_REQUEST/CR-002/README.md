# Change Request: CR-002

## Metadata
- **Title**: Remove Drag Grip Icon from AI Chat Window Heading
- **Date**: 2026-11-21
- **Status**: Implemented
- **File Location**: 
  - `src/components/AIChat/AIChat.tsx`
  - `src/components/AIChat/AIChat.css`

---

## Description
Removed the visual drag grip icon (`GripHorizontal`) from the header of the AI chat window component while keeping the entire window draggable on desktop devices:

1. **`src/components/AIChat/AIChat.tsx`**:
   - Removed `GripHorizontal` from the `lucide-react` import statement.
   - Removed the `<div className="chat-header-grip" aria-hidden="true"><GripHorizontal size={16} /></div>` element from the header JSX.
   - Retained `chat-header-draggable` and pointer event listeners on the header container so the desktop window repositioning behavior remains functional.

2. **`src/components/AIChat/AIChat.css`**:
   - Removed `.chat-header-grip` and hover rules to keep the styling DRY and prevent dead CSS.
