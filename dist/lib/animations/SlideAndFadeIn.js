import React from "react";
import Animated, { Easing } from "react-native-reanimated";
/**
 * Wrapper View that uses react-native-reanimated to slide and fade in a View
 * and it's subviews.
 *
 * ```typescript
 * <SlideAndFadeIn direction="up">
 *   <Text>Hello</Text>
 * </SlideAndFadeIn>
 * ```
 *
 * If you don't want the animation to run immediately, you can pass
 * autoRun={false} and then use a ref to trigger animation.
 * ```typescript
 * const slideAndFadeIn = useRef(null);
 * <SlideAndFadeIn ref={slideAndFadeIn}>
 *   <Text>Hello</Text>
 * </SlideAndFadeIn>
 * // Elsewhere in your code
 * slideAndFadeIn.current.animate();
 * ```
 */
export default class SlideAndFadeIn extends React.Component {
    constructor(props) {
        super(props);
        this.animate = () => {
            Animated.timing(this.value, {
                toValue: 1,
                // See https://material.io/design/motion/speed.html#duration
                duration: this.props.duration,
                easing: Easing.out(Easing.ease)
            }).start();
        };
        this._updateTransforms = () => {
            const { slideBy, direction } = this.props;
            switch (direction) {
                case "up":
                    this.setState({
                        property: "translateY",
                        outputRange: [-slideBy, 0]
                    });
                    break;
                case "down":
                    this.setState({
                        property: "translateY",
                        outputRange: [slideBy, 0]
                    });
                    break;
                case "right":
                    this.setState({
                        property: "translateX",
                        outputRange: [-slideBy, 0]
                    });
                    break;
                case "left":
                    this.setState({
                        property: "translateX",
                        outputRange: [slideBy, 0]
                    });
                    break;
            }
        };
        this.reset = () => {
            this.value.setValue(0);
        };
        this.value = new Animated.Value(0);
        const { slideBy, direction } = props;
        switch (direction) {
            case "up":
                this.state = {
                    property: "translateY",
                    outputRange: [slideBy, 0]
                };
                break;
            case "down":
                this.state = {
                    property: "translateY",
                    outputRange: [-slideBy, 0]
                };
                break;
            case "right":
                this.state = {
                    property: "translateX",
                    outputRange: [-slideBy, 0]
                };
                break;
            case "left":
                this.state = {
                    property: "translateX",
                    outputRange: [slideBy, 0]
                };
                break;
        }
    }
    componentDidMount() {
        if (this.props.autoRun) {
            this.animate();
        }
    }
    componentDidUpdate(prevProps) {
        const { slideBy, direction } = this.props;
        if (prevProps.slideBy !== slideBy || prevProps.direction !== direction) {
            this._updateTransforms();
        }
    }
    render() {
        const { style, children, ...rest } = this.props;
        const { property, outputRange } = this.state;
        return (React.createElement(Animated.View, Object.assign({ style: [
                style,
                {
                    opacity: this.value,
                    transform: [
                        {
                            [property]: this.value.interpolate({
                                inputRange: [0, 1],
                                outputRange
                            })
                        }
                    ]
                }
            ] }, rest), children));
    }
}
SlideAndFadeIn.defaultProps = {
    autoRun: true,
    direction: "up",
    duration: 150,
    slideBy: 200
};
