const utilities = {
  // DISPLAY
  'block': {'display': 'block'},
  'inline-block': {'display': 'inline-block'},
  'inline': {'display': 'inline'},
  'flex': {'display': 'flex'},
  'inline-flex': {'display': 'inline-flex'},
  'grid': {'display': 'grid'},
  'hidden': {'display': 'none'},

  // FLEXBOX
  'flex-row': {'flex-direction': 'row'},
  'flex-col': {'flex-direction': 'column'},
  'flex-wrap': {'flex-wrap': 'wrap'},
  'flex-nowrap': {'flex-wrap': 'nowrap'},
  'justify-start': {'justify-content': 'flex-start'},
  'justify-center': {'justify-content': 'center'},
  'justify-end': {'justify-content': 'flex-end'},
  'justify-between': {'justify-content': 'space-between'},
  'justify-around': {'justify-content': 'space-around'},
  'items-start': {'align-items': 'flex-start'},
  'items-center': {'align-items': 'center'},
  'items-end': {'align-items': 'flex-end'},
  'items-stretch': {'align-items': 'stretch'},

  // MARGIN
  'm-0': {'margin': '0'},
  'm-1': {'margin': '0.25rem'},
  'm-2': {'margin': '0.5rem'},
  'm-3': {'margin': '0.75rem'},
  'm-4': {'margin': '1rem'},
  'm-5': {'margin': '1.25rem'},
  'm-6': {'margin': '1.5rem'},
  'm-8': {'margin': '2rem'},
  'm-auto': {'margin': 'auto'},

  'mx-0': {'margin-left': '0', 'margin-right': '0'},
  'mx-1': {'margin-left': '0.25rem', 'margin-right': '0.25rem'},
  'mx-2': {'margin-left': '0.5rem', 'margin-right': '0.5rem'},
  'mx-4': {'margin-left': '1rem', 'margin-right': '1rem'},
  'mx-auto': {'margin-left': 'auto', 'margin-right': 'auto'},

  'my-0': {'margin-top': '0', 'margin-bottom': '0'},
  'my-1': {'margin-top': '0.25rem', 'margin-bottom': '0.25rem'},
  'my-2': {'margin-top': '0.5rem', 'margin-bottom': '0.5rem'},
  'my-4': {'margin-top': '1rem', 'margin-bottom': '1rem'},

  'mt-0': {'margin-top': '0'},
  'mt-1': {'margin-top': '0.25rem'},
  'mt-2': {'margin-top': '0.5rem'},
  'mt-4': {'margin-top': '1rem'},
  'mb-0': {'margin-bottom': '0'},
  'mb-1': {'margin-bottom': '0.25rem'},
  'mb-2': {'margin-bottom': '0.5rem'},
  'mb-4': {'margin-bottom': '1rem'},
  'ml-0': {'margin-left': '0'},
  'ml-1': {'margin-left': '0.25rem'},
  'ml-2': {'margin-left': '0.5rem'},
  'ml-4': {'margin-left': '1rem'},
  'mr-0': {'margin-right': '0'},
  'mr-1': {'margin-right': '0.25rem'},
  'mr-2': {'margin-right': '0.5rem'},
  'mr-4': {'margin-right': '1rem'},

  // PADDING
  'p-0': {'padding': '0'},
  'p-1': {'padding': '0.25rem'},
  'p-2': {'padding': '0.5rem'},
  'p-3': {'padding': '0.75rem'},
  'p-4': {'padding': '1rem'},
  'p-5': {'padding': '1.25rem'},
  'p-6': {'padding': '1.5rem'},
  'p-8': {'padding': '2rem'},

  'px-0': {'padding-left': '0', 'padding-right': '0'},
  'px-1': {'padding-left': '0.25rem', 'padding-right': '0.25rem'},
  'px-2': {'padding-left': '0.5rem', 'padding-right': '0.5rem'},
  'px-4': {'padding-left': '1rem', 'padding-right': '1rem'},
  'py-0': {'padding-top': '0', 'padding-bottom': '0'},
  'py-1': {'padding-top': '0.25rem', 'padding-bottom': '0.25rem'},
  'py-2': {'padding-top': '0.5rem', 'padding-bottom': '0.5rem'},
  'py-4': {'padding-top': '1rem', 'padding-bottom': '1rem'},

  // WIDTH & HEIGHT
  'w-full': {'width': '100%'},
  'w-screen': {'width': '100vw'},
  'w-auto': {'width': 'auto'},
  'h-full': {'height': '100%'},
  'h-screen': {'height': '100vh'},
  'h-auto': {'height': 'auto'},
  'min-h-screen': {'min-height': '100vh'},

  // TYPOGRAPHY
  'text-xs': {'font-size': '0.75rem', 'line-height': '1rem'},
  'text-sm': {'font-size': '0.875rem', 'line-height': '1.25rem'},
  'text-base': {'font-size': '1rem', 'line-height': '1.5rem'},
  'text-lg': {'font-size': '1.125rem', 'line-height': '1.75rem'},
  'text-xl': {'font-size': '1.25rem', 'line-height': '1.75rem'},
  'text-2xl': {'font-size': '1.5rem', 'line-height': '2rem'},
  'text-3xl': {'font-size': '1.875rem', 'line-height': '2.25rem'},

  'font-thin': {'font-weight': '100'},
  'font-light': {'font-weight': '300'},
  'font-normal': {'font-weight': '400'},
  'font-medium': {'font-weight': '500'},
  'font-semibold': {'font-weight': '600'},
  'font-bold': {'font-weight': '700'},

  'text-left': {'text-align': 'left'},
  'text-center': {'text-align': 'center'},
  'text-right': {'text-align': 'right'},

  // COLORS
  
  // TEXT
  'text-white': {'color': '#ffffff'},
  'text-black': {'color': '#000000'},
  'text-gray-500': {'color': '#6b7280'},
  'text-gray-700': {'color': '#374151'},
  'text-red-500': {'color': '#ef4444'},
  'text-green-500': {'color': '#22c55e'},
  'text-blue-500': {'color': '#3b82f6'},
  'text-blue-600': {'color': '#2563eb'},

  // BACKGROUND
  'bg-white': {'background-color': '#ffffff'},
  'bg-black': {'background-color': '#000000'},
  'bg-gray-100': {'background-color': '#f3f4f6'},
  'bg-gray-200': {'background-color': '#e5e7eb'},
  'bg-gray-500': {'background-color': '#6b7280'},
  'bg-red-500': {'background-color': '#ef4444'},
  'bg-green-500': {'background-color': '#22c55e'},
  'bg-blue-500': {'background-color': '#3b82f6'},
  'bg-blue-600': {'background-color': '#2563eb'},

  // BORDERS
  'border': {'border-width': '1px', 'border-style': 'solid'},
  'border-0': {'border-width': '0'},
  'border-2': {'border-width': '2px', 'border-style': 'solid'},
  'border-gray-300': {'border-color': '#d1d5db'},
  'border-gray-500': {'border-color': '#6b7280'},
  'border-blue-500': {'border-color': '#3b82f6'},

  'rounded': {'border-radius': '0.25rem'},
  'rounded-md': {'border-radius': '0.375rem'},
  'rounded-lg': {'border-radius': '0.5rem'},
  'rounded-full': {'border-radius': '9999px'},

  // EFFECTS
  'shadow': {'box-shadow': '0 1px 3px 0 rgb(0 0 0 / 0.1)'},
  'shadow-md': {'box-shadow': '0 4px 6px -1px rgb(0 0 0 / 0.1)'},
  'shadow-lg': {'box-shadow': '0 10px 15px -3px rgb(0 0 0 / 0.1)'},

  // CURSOR
  'cursor-pointer': {'cursor': 'pointer'},
  'cursor-not-allowed': {'cursor': 'not-allowed'},
};

module.exports = utilities;