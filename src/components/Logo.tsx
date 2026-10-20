import React from 'react';
import { cn } from '@/lib/utils';

/**
 * The Dominion City heart with the skyline cut out, as one path (redrawn from
 * the 225px PNG for the flyer kit). It takes the text colour, so it is white
 * on navy and heart blue on the light theme; the old white PNG vanished on
 * light backgrounds.
 */
const Logo: React.FC<{ className?: string; title?: string }> = ({ className, title }) => (
  <svg
    viewBox="1.875 12.875 221.25 199.625"
    className={cn('logo-mark', className)}
    role={title ? 'img' : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
  >
    <path d="M112.5 212.5C76.5 186 1.875 133 1.875 71A58.125 58.125 0 0 1 112.5 46.06A58.125 58.125 0 0 1 223.125 71C223.125 133 148.5 186 112.5 212.5ZM36 135V114H53V99H64V130H67V47H81V130H83V74H100V130H103V85H120V57H145V130H155V80L167 62V130H173V92H189V135Z" fill="currentColor" fillRule="evenodd" />
  </svg>
);

export default Logo;
