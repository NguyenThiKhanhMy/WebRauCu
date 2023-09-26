import { Tree } from "element-react";
import { Guid } from "common/Enums";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

interface Props {
    data: any,
    options?: any,
    onNodeClicked?: Function,
    nodeKey?: any,
    defaultExpandedKeys?: any,
    isShowCheckbox?: any,
    getCheckedKeys?: any,
    defaultCheckedKeys?: any,
    defaultExpandAll?: any
    expandOnClickNode?:any,
    accordion?: any,
    
}

const CTree = forwardRef((props: Props, ref) => {
    const refTree = useRef<any>();
    const getCheckedKeys = (leafOnly: any) => {
        return refTree.current.getCheckedKeys(leafOnly);
    }
    const setCheckedKeys = (keys: any) => {
      return refTree.current.setCurrentKey(keys);
  }
    useImperativeHandle(ref, () => ({
        getCheckedKeys: (leafOnly: any) => { return getCheckedKeys(leafOnly) },
        setCheckedKeys: (keys: any) => { setCheckedKeys(keys) }
    }));
    return (
        <Tree
            ref={refTree}
            accordion={props.accordion == true ? true : false}
            expandOnClickNode={props.expandOnClickNode == true ? true : false}
            isShowCheckbox={props.isShowCheckbox == true ? true : false}
            defaultExpandAll={props.defaultExpandAll == true ? true : false}
            data={props.data}
            options={props.options}
            highlightCurrent={true}
            onNodeClicked={(data, node) => {
                if (props.onNodeClicked) {
                    props.onNodeClicked(data, node)
                }
            }}
            nodeKey={props.nodeKey}
            defaultCheckedKeys={props.defaultCheckedKeys}
            defaultExpandedKeys={props.defaultExpandedKeys && props.defaultExpandedKeys.length > 0 ? props.defaultExpandedKeys : [Guid.Empty]} />
    )
})

export default CTree;
