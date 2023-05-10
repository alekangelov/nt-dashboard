interface Props {
  onDrop: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  name?: string;
  id?: string;
  label?: string;
}

export const Dropzone = (props: Props) => {
  return (
    <div class="wrapper">
      <input
        name={props.name}
        id={props.id}
        type="file"
        accept={props.accept}
        multiple={props.multiple}
      />
    </div>
  );
};
