// 
// #include "vec3.h"

// Preprocessor shortcuts
#define Math_min (a,b) (((a) < (b)) ? (a) : (b))
#define Math_max (a,b) (((a) > (b)) ? (a) : (b))
#define Math_clamp (a, mi, ma) Math_min(Math_max(a, mi), ma)
#define Math_abs (a) ((a) < 0 ? -(a) : (a))
#define Math_sign (v) (((v) > 0) - ((v) < 0))

// // Define external funcs
// extern void vec3_add(vec3, vec3, vec3);
// extern void vec3_sub(vec3, vec3, vec3);
// extern void vec3_mul(vec3, float, vec3);
// extern void vec3_div(vec3, float, vec3);
