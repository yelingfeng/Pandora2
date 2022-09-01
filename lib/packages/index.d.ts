import { Plugin } from 'vue';
export { default as PdContainer } from './PandoraContainer';
export { default as PdForm } from './PdForm';
export { default as PdTable } from './PdTable';
declare const Pandora2: Plugin;
export { useComponentRegister } from './PdForm/src/hooks/useComponentRegister';
export { useForm } from './PdForm/src/hooks/useForm';
export default Pandora2;
