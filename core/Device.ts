
// Device.ts
// Just abstracts the canvas crap
// Accepts a Uint8 buffer for rendering

import Mesh              from '../mesh/Mesh';
import Vector3           from '../math/Vector3';
import Matrix            from '../math/Matrix';
import IRasteriser       from '../rasteriser/IRasteriser';
import {BYTES_PER_PIXEL} from './Sym';

// rename VideoDevice() as will extend to include texture "memory" etc
export default class Device
{
  private context: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private width: number;
  private height: number;
  private hwidth: number;
  private hheight: number;
  private imageData: ImageData;
  private rasteriser: IRasteriser;
  private bytes: number;
  public container: HTMLElement;

  constructor(width: number, height: number, rasteriser: IRasteriser)
  {
    this.width = width;
    this.height = height;
    this.hwidth = (width/2)>>0;
    this.hheight = (height/2)>>0;
    this.rasteriser = rasteriser;
    this.container = null;

    this.rasteriser.init(width, height);
    this.bytes = width * height * BYTES_PER_PIXEL;
  }

  public create(element?:string): void
  {
    let e:HTMLElement = !(element) ? document.body :
                                     document.getElementById( element );

    let c:HTMLCanvasElement = document.createElement( 'canvas' );

    this.container = document.createElement('div');

    // this.container.style.backgroundColor = "#f0f";
    this.container.style.width = this.width+"px";
    this.container.style.height = this.height+"px";
    this.container.style.position = "relative";
    // this.container.style.border = "1px solid #d0d0d0";

    this.container.appendChild(c);

    c.width = this.width;
    c.height = this.height;

    this.canvas = c;
    this.context = this.canvas.getContext( '2d' );

    // the actual pixel data
    this.imageData = this.context.getImageData( 0, 0, this.width, this.height );

    e.appendChild( this.container );

    this.clear();
  }

  public use(rasteriser:IRasteriser): void
  {
    if (!rasteriser.ready)
      rasteriser.init( this.width, this.height );

    this.rasteriser = rasteriser;
  }

  public clear(): void
  {
    this.rasteriser.begin();
  }

  // Old school points for smiling at 'flip'
  public flip(): void
  {
    if (!this.rasteriser.buffer)
      throw new ReferenceError("`rasteriser.buffer: Uint8ClampedArray` is required!");

    this.imageData.data.set( this.rasteriser.buffer );
    this.context.putImageData( this.imageData, 0, 0 );

    this.rasteriser.end();
  }

  // Renders a textured Mesh with zBuffer
  public render(m: Mesh, mat:number[][]):void
  {
    // Directional light
    let light = [0, 0, -1];
    let saturation = 1.35;

    // Initialise these outside the loop for normal/lighting calcs
    let v1 = Vector3.create();
    let v2 = Vector3.create();
    let fnormal = Vector3.create();

    // Rasterisation screen coordinates buffer
    let triscreen = [
      Vector3.create(),
      Vector3.create(),
      Vector3.create()
    ];

    // Triangle world coordinates for lighting, culling
    let triworld = [
      Vector3.create(),
      Vector3.create(),
      Vector3.create()
    ];

    let vertex;
    let transform = Matrix.create();

    Matrix.concat([m.matrix, mat], transform);

    // For each face (triangle) of the mesh model
    for (let fi=0; fi<m.faces.length; fi++)
    {

      let face = m.faces[fi];

      // Transform each face's vertex into view space
      for (let v=0; v<3; v++)
      {
        vertex = m.vertices[face[v]];

        Matrix.transform(vertex, transform, triworld[v]);

        triscreen[v][0] =  triworld[v][0] * this.width + this.hwidth;
        triscreen[v][1] = -triworld[v][1] * this.height + this.hheight;
        triscreen[v][2] =  triworld[v][2];
      }

      // Compute lighting & visibilty for this face
      Vector3.sub(triworld[2], triworld[1], v1);
      Vector3.sub(triworld[1], triworld[0], v2);
      Vector3.cross(v1, v2, fnormal);
      Vector3.norm(fnormal, fnormal);

      let power = Vector3.dot(fnormal, light);

      // Instead of rasterising immediately, accumulate face normals and then
      // Rasterise if visible etc
      
      if (power > 0 && m.textures.length > 0)
      {
        // Call the rasteriser! JS || WASM
        this.rasteriser.tri(
          triscreen, m.uvs[fi], power * saturation,
          m.textures[m.uvtextures[fi]]
        );
      }


    }
  }

}
